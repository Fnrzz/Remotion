import React from "react";
import { spring } from "remotion";
import {
  AgentNetwork,
  CentralModelNode,
  CoordinationSystem,
} from "../components/AgentNetwork";
import {
  Canvas,
  EightDayTimeline,
  IllustrationStage,
  MinimalHeadline,
} from "../components/Editorial";
import { EmptyFolderWorkspace } from "../components/EmptyFolderWorkspace";
import { VectorLaptop } from "../components/VectorLaptop";
import { FABLE_CUES as C, useNarrationClock } from "../data/timing";

const Qualifier: React.FC<{ children: React.ReactNode; opacity?: number }> = ({
  children,
  opacity = 1,
}) => (
  <div
    style={{
      position: "absolute",
      left: 84,
      top: 530,
      width: 912,
      fontSize: 30,
      fontWeight: 700,
      letterSpacing: "0.015em",
      opacity,
    }}
  >
    {children}
  </div>
);

export const ThousandAgentsScene: React.FC = () => {
  const { progress: p } = useNarrationClock("hook");
  return (
    <Canvas dark>
      <MinimalHeadline size={112}>
        <span style={{ opacity: p(0.13, 0.4) }}>
          1.000+
          <br />
          AI AGENT
        </span>
      </MinimalHeadline>
      <div
        style={{
          position: "absolute",
          left: 84,
          top: 520,
          fontSize: 88,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          opacity: p(C.hookEightDays, 3.55),
        }}
      >
        <span style={{ color: "#708090" }}>8</span> HARI
      </div>
      <IllustrationStage dark>
        <AgentNetwork
          expansion={p(0.35, C.hookNetworkPeak)}
          convergence={p(3.96, 4.5)}
          folder={1 - p(0.18, 0.5)}
          dark
        />
      </IllustrationStage>
    </Canvas>
  );
};

export const EmptyFolderScene: React.FC = () => {
  const { seconds, progress: p } = useNarrationClock("folder");
  return (
    <Canvas>
      <MinimalHeadline size={112}>
        {seconds < 8.92 ? (
          <>
            CLAUDE
            <br />
            <span style={{ color: "#708090" }}>FABLE 5.2</span>
          </>
        ) : (
          <>
            FOLDER
            <br />
            <span style={{ color: "#708090" }}>KOSONG</span>
          </>
        )}
      </MinimalHeadline>
      <Qualifier opacity={p(C.prototype, 14.25)}>PROTOTIPE OS</Qualifier>
      <IllustrationStage>
        <g opacity={1 - p(9.1, 9.5)}>
          <CentralModelNode folder={p(8.92, 9.3)} />
        </g>
        <g opacity={p(8.92, 9.3)}>
          <EmptyFolderWorkspace
            instruction={p(C.instruction, 13.65)}
            opening={p(13.08, 13.65)}
            delegation={p(13.65, 15.55)}
          />
        </g>
      </IllustrationStage>
    </Canvas>
  );
};

export const CoordinationScene: React.FC = () => {
  const { progress: p } = useNarrationClock("coordination");
  const reframe = p(C.test, 21.65);
  return (
    <Canvas>
      <MinimalHeadline size={104}>
        SATU MODEL.
        <br />
        <span style={{ color: "#708090" }}>BANYAK AGEN.</span>
      </MinimalHeadline>
      <IllustrationStage>
        <g
          transform={`translate(318 ${190 - reframe * 20}) scale(${1 - reframe * 0.18}) translate(-318 -190)`}
        >
          <g opacity={1 - p(15.55, 16.23)}>
            <EmptyFolderWorkspace instruction={1} opening={1} delegation={1} />
          </g>
          <g opacity={p(15.55, 16.23) * (1 - p(18.6, 19.27))}>
            <AgentNetwork expansion={p(15.55, C.subagents)} />
          </g>
          <g opacity={p(18.6, 19.27)}>
            <CoordinationSystem
              delegation={p(16.23, 18.44)}
              construction={0.12 * p(16.23, 18.44) + 0.88 * p(C.write, 21.65)}
              feedback={p(C.review, C.eightDays)}
              integration={0}
            />
          </g>
          {/* A scan, not a fabricated successful test. */}
          <g
            opacity={p(C.test, 20.85) * (1 - p(21.45, 21.86))}
            stroke="#708090"
            fill="none"
            strokeWidth="1.6"
          >
            <path d={`M278 ${283 + p(C.test, 21.65) * 45}H358`} />
            <path d="M278 291V283H286M350 283H358V291M278 323V331H286M350 331H358V323" />
          </g>
        </g>
        <g opacity={p(C.test, 20.85)}>
          <EightDayTimeline progress={p(C.test, C.eightDays)} />
        </g>
      </IllustrationStage>
    </Canvas>
  );
};

export const EightDaysScene: React.FC = () => {
  const { progress: p } = useNarrationClock("eightDays");
  return (
    <Canvas>
      <MinimalHeadline size={112}>
        8 HARI.
        <br />
        <span style={{ color: "#708090" }}>SATU SISTEM.</span>
      </MinimalHeadline>
      <Qualifier opacity={p(C.reported, 24.55)}>MENURUT ANTHROPIC</Qualifier>
      <IllustrationStage>
        <g
          opacity={1 - p(24.95, 25.24)}
          transform="translate(318 170) scale(0.82) translate(-318 -190)"
        >
          <CoordinationSystem
            delegation={1}
            construction={1}
            feedback={p(C.review, C.eightDays)}
            integration={p(23.12, 24.95)}
          />
        </g>
        <g opacity={1 - p(24.95, 25.24)}>
          <EightDayTimeline progress={p(C.test, C.eightDays)} />
        </g>
        <g opacity={p(24.95, 25.24)}>
          <VectorLaptop
            opening={0}
            power={0}
            boot={0}
            login={0}
            desktop={0}
            windows={0}
            folder={0}
          />
        </g>
      </IllustrationStage>
    </Canvas>
  );
};

export const BootScene: React.FC = () => {
  const { frame, fps, progress: p } = useNarrationClock("boot");
  return (
    <Canvas>
      <MinimalHeadline size={112}>
        PROTOTIPE
        <br />
        <span style={{ color: "#708090" }}>OS.</span>
      </MinimalHeadline>
      <Qualifier>MENURUT ANTHROPIC</Qualifier>
      <IllustrationStage>
        <VectorLaptop
          opening={spring({
            frame,
            fps,
            durationInFrames: Math.round(0.75 * fps),
            config: { damping: 200 },
          })}
          power={p(C.boot, 26.12)}
          boot={p(C.boot, 27.13)}
          login={p(C.login, 30.14)}
          desktop={p(30.5, 30.85)}
          windows={p(30.85, 31.12)}
          folder={p(31.12, C.installer)}
          features={p(C.drivers, 27.84)}
          storage={p(C.storage, 28.57)}
        />
        {/* The recording names windows BEFORE login. Show the concept here. */}
        <g
          opacity={p(C.windows, 29.5) * (1 - p(30.5, 30.85))}
          stroke="#000000"
          fill="#FAF9F6"
          strokeWidth="1.7"
        >
          <rect x="24" y="154" width="61" height="44" />
          <path
            d="M24 165H85M33 178H59M33 187H70"
            fill="none"
            stroke="#708090"
          />
        </g>
        <g
          opacity={p(C.installer, 31.85)}
          stroke="#000000"
          strokeWidth="1.7"
          fill="none"
          transform="translate(302 345)"
        >
          <path d="M0 6V24H32V6M16-7V14M9 7 16 14 23 7" />
          <text
            x="16"
            y="46"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            stroke="none"
            fill="#555555"
          >
            INSTALLER
          </text>
        </g>
      </IllustrationStage>
    </Canvas>
  );
};

export const RealityAndQuestionScene: React.FC = () => {
  const { seconds, progress: p } = useNarrationClock("reality");
  return (
    <Canvas>
      <MinimalHeadline size={96}>
        {seconds < C.notReplacement ? (
          <>
            MASIH
            <br />
            <span style={{ color: "#708090" }}>PROTOTIPE.</span>
          </>
        ) : seconds < C.coordinationRecap ? (
          <>
            BUKAN
            <br />
            <span style={{ color: "#708090" }}>OS FINAL.</span>
          </>
        ) : seconds < C.question ? (
          <>
            PROYEK BESAR.
            <br />
            <span style={{ color: "#708090" }}>KERJA PARALEL.</span>
          </>
        ) : (
          <>
            AI AGENT
            <br />
            <span style={{ color: "#708090" }}>BIKIN APA LAGI?</span>
          </>
        )}
      </MinimalHeadline>
      <Qualifier
        opacity={p(C.internal, 34.9) * (1 - p(C.coordinationRecap, 39.5))}
      >
        EKSPERIMEN INTERNAL
      </Qualifier>
      <IllustrationStage>
        <g
          opacity={1 - p(C.coordinationRecap, 40.11)}
          transform={`translate(318 190) scale(${1 - 0.1 * p(C.caveat, 33.46)}) translate(-318 -190)`}
        >
          <VectorLaptop
            opening={1}
            power={1}
            boot={1}
            login={1}
            desktop={1}
            windows={1}
            folder={1}
            features={1}
          />
          <g
            opacity={p(C.notReplacement, 36.62)}
            stroke="#708090"
            strokeWidth="1.6"
            strokeDasharray="4 5"
            fill="none"
          >
            <path d="M185 19H251M385 19H451M185 350H251M385 350H451" />
            <path d="M251 19V33M385 19V33M251 332V350M385 332V350" />
          </g>
        </g>
        <g opacity={p(C.coordinationRecap, 40.11) * (1 - p(C.question, 45.55))}>
          <CoordinationSystem
            delegation={p(C.coordinationRecap, 40.95)}
            construction={p(40.37, 42.88)}
            feedback={p(42.3, C.integrateRecap)}
            integration={p(C.integrateRecap, 44.84)}
          />
        </g>
        <g data-closing-network opacity={p(C.question, 45.55)}>
          <AgentNetwork expansion={p(C.question, 46.5)} />
        </g>
      </IllustrationStage>
    </Canvas>
  );
};
