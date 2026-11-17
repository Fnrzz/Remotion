// Run from the project root: swift scripts/extract-character-mask.swift
// The original sheet and Markdown guide are left unchanged.
import CoreImage
import Foundation
import ImageIO
import UniformTypeIdentifiers
import Vision

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let folder = root.appendingPathComponent("public/assets/images/charactersheet")
let guide = try String(contentsOf: folder.appendingPathComponent("karaktersheet.md"), encoding: .utf8)
let source = CGImageSourceCreateWithURL(folder.appendingPathComponent("karaktersheet.png") as CFURL, nil)!
let sheet = CGImageSourceCreateImageAtIndex(source, 0, nil)!
// Actual panel boundaries in the supplied sheet: first two rows end at 272/537.
let poses: [(id: String, rect: CGRect)] = [
  ("r1c1", CGRect(x: 0, y: 0, width: 307, height: 272)),
  ("r1c3", CGRect(x: 614, y: 0, width: 307, height: 272)),
  ("r1c4", CGRect(x: 922, y: 0, width: 307, height: 272)),
  ("r1c5", CGRect(x: 1229, y: 0, width: 307, height: 272)),
  ("r2c1", CGRect(x: 0, y: 272, width: 307, height: 265)),
  ("r2c2", CGRect(x: 307, y: 272, width: 307, height: 265)),
  ("r2c3", CGRect(x: 614, y: 272, width: 307, height: 265)),
  ("r2c4", CGRect(x: 922, y: 272, width: 307, height: 265)),
  ("r2c5", CGRect(x: 1229, y: 272, width: 307, height: 265)),
  // Exclude the thin seam at the bottom of the lower-row panels.
  ("r3c1", CGRect(x: 0, y: 537, width: 307, height: 251)),
  ("r4c1", CGRect(x: 0, y: 790, width: 307, height: 232)),
  ("r4c2", CGRect(x: 307, y: 790, width: 307, height: 232)),
]
let context = CIContext()
func write(_ image: CIImage, _ extent: CGRect, _ url: URL) {
  let output = CGImageDestinationCreateWithURL(url as CFURL, UTType.png.identifier as CFString, 1, nil)!
  CGImageDestinationAddImage(output, context.createCGImage(image, from: extent)!, nil)
  precondition(CGImageDestinationFinalize(output), "Cannot write \(url.path)")
}
try FileManager.default.createDirectory(at: root.appendingPathComponent(".preview"), withIntermediateDirectories: true)
for pose in poses {
  guard guide.contains(pose.id.uppercased()) else {
    fatalError("Pose \(pose.id) is missing from the Markdown guide.")
  }
  let crop = sheet.cropping(to: pose.rect)!
  let handler = VNImageRequestHandler(cgImage: crop)
  let request = VNGenerateForegroundInstanceMaskRequest()
  try handler.perform([request])
  guard let result = request.results?.first, !result.allInstances.isEmpty else {
    fatalError("No foreground character found in \(pose.id).")
  }
  let buffer = try result.generateScaledMaskForImage(forInstances: result.allInstances, from: handler)
  let mask = CIImage(cvPixelBuffer: buffer)
  let extent = CGRect(x: 0, y: 0, width: crop.width, height: crop.height)
  let transparent = CIImage(color: .clear).cropped(to: extent)
  let cutout = CIImage(cgImage: crop).applyingFilter(
    "CIBlendWithMask",
    parameters: [kCIInputBackgroundImageKey: transparent, kCIInputMaskImageKey: mask]
  )
  write(cutout, extent, folder.appendingPathComponent("karaktersheet-\(pose.id).png"))
  // Retain the mask output used by the original single-pose overlay.
  if pose.id == "r1c3" {
    let alphaMask = CIImage(color: .white).cropped(to: extent).applyingFilter(
      "CIBlendWithMask",
      parameters: [kCIInputBackgroundImageKey: transparent, kCIInputMaskImageKey: mask]
    )
    write(alphaMask, extent, folder.appendingPathComponent("karaktersheet-r1c3-mask.png"))
    write(cutout, extent, root.appendingPathComponent(".preview/character-r1c3-cutout.png"))
  }
  print("Extracted \(pose.id.uppercased()) with a transparent background.")
}
