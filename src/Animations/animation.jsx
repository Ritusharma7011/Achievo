import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaLinux,
  FaDatabase,
  FaServer,
  FaTerminal,
  FaLaptopCode,
} from "react-icons/fa";

import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiRedux,
  SiVite,

  SiExpress,
  SiSpring,
  SiPhp,
  SiLaravel,
  SiDjango,
  SiFlask,

  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiRedis,

  SiKubernetes,
  SiGooglecloud,
  SiGit,
  SiGitlab,
  SiPostman,
  SiIntellijidea,

  SiAndroid,
  SiFlutter,
  SiDart,
  SiKotlin,
  SiSwift,

  SiGraphql,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiFigma,

  SiWebpack,
  SiBabel,
  SiJenkins,
  SiTerraform,
  SiNetlify,
  SiVercel,
  SiNpm,
  SiYarn,
} from "react-icons/si";

const iconRows = [
  [
    { Icon: SiHtml5, color: "#E34F26" },

    { Icon: SiJavascript, color: "#F7DF1E" },
    { Icon: SiTypescript, color: "#3178C6" },
    { Icon: FaReact, color: "#61DAFB" },
    { Icon: SiRedux, color: "#764ABC" },
    { Icon: SiTailwindcss, color: "#06B6D4" },
    { Icon: SiBootstrap, color: "#7952B3" },
    { Icon: SiSass, color: "#CC6699" },
    { Icon: SiVite, color: "#646CFF" },
  ],

  [
    { Icon: FaNodeJs, color: "#3C873A" },
    { Icon: SiExpress, color: "#FFFFFF" },
    { Icon: FaJava, color: "#EA2D2E" },
    { Icon: SiSpring, color: "#6DB33F" },
    { Icon: FaPython, color: "#3776AB" },
    { Icon: SiDjango, color: "#092E20" },
    { Icon: SiFlask, color: "#FFFFFF" },
    { Icon: SiPhp, color: "#777BB4" },
    { Icon: SiLaravel, color: "#FF2D20" },
    { Icon: FaServer, color: "#A855F7" },
  ],

  [
    { Icon: SiMongodb, color: "#47A248" },
    { Icon: SiMysql, color: "#4479A1" },
    { Icon: SiPostgresql, color: "#336791" },
    { Icon: SiFirebase, color: "#FFCA28" },
    { Icon: SiRedis, color: "#DC382D" },
    { Icon: FaDatabase, color: "#F59E0B" },
    { Icon: SiGraphql, color: "#E10098" },
    { Icon: SiNextdotjs, color: "#FFFFFF" },
    { Icon: SiVuedotjs, color: "#42B883" },
    { Icon: SiAngular, color: "#DD0031" },
  ],

  [
    { Icon: FaGitAlt, color: "#F05032" },
    { Icon: FaGithub, color: "#FFFFFF" },
    { Icon: SiGitlab, color: "#FC6D26" },
    { Icon: FaDocker, color: "#2496ED" },
    { Icon: SiKubernetes, color: "#326CE5" },

    { Icon: SiGooglecloud, color: "#4285F4" },

    { Icon: SiTerraform, color: "#7B42BC" },
    { Icon: SiJenkins, color: "#D24939" },
  ],

  [
    { Icon: SiPostman, color: "#FF6C37" },

    { Icon: SiIntellijidea, color: "#FE315D" },
    { Icon: FaLaptopCode, color: "#38BDF8" },
    { Icon: FaTerminal, color: "#22C55E" },
    { Icon: FaLinux, color: "#FCC624" },
    { Icon: SiAndroid, color: "#3DDC84" },
    { Icon: SiFlutter, color: "#02569B" },
    { Icon: SiKotlin, color: "#7F52FF" },
    { Icon: SiFigma, color: "#F24E1E" },
  ],
];

function MarqueeRow({
  icons,
  direction = "left",
  duration = 25,
}) {

  // Repeat icons for continuous loop
  const repeatedIcons = [
    ...icons,
    ...icons,
    ...icons,
  ];

  return (
    <div className="relative w-full overflow-hidden py-3">

      <div
        className="flex w-max items-center gap-6"
        style={{
          animation: `${
            direction === "left"
              ? "moveLeft"
              : "moveRight"
          } ${duration}s linear infinite`,
        }}
      >

        {repeatedIcons.map((item, index) => {
          const { Icon, color } = item;

          return (
            <div
              key={index}
              className="
                group
                flex
                h-14
                w-14
                sm:h-16
                sm:w-16
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-lg
                cursor-pointer
                transition-all
                duration-300
                hover:scale-125
                hover:-translate-y-1
                hover:rotate-6
              "
              style={{
                boxShadow: "0 0 0 transparent",
              }}

              onMouseEnter={(e)=>{
                e.currentTarget.style.boxShadow =
                `0 0 25px ${color}`;
              }}

              onMouseLeave={(e)=>{
                e.currentTarget.style.boxShadow =
                "0 0 0 transparent";
              }}
            >

              <Icon
                size={28}
                color={color}
                className="
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default function Animation() {
  return (
    <div
      className="
      relative
      h-[500px]
      w-full
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      shadow-2xl
      transition-all duration-200
      "
    >

      {/* Background Glow */}
      <div
        className="
        absolute
        -left-20
        -top-20
        h-72
        w-72
        rounded-full
        bg-cyan-400/20
        blur-3xl
        "
      />

      <div
        className="
        absolute
        -bottom-20
        -right-20
        h-72
        w-72
        rounded-full
        bg-purple-500/20
        blur-3xl
        "
      />


      {/* Icon Rows */}
      <div
        className="
        flex
        h-full
        flex-col
        justify-center
        gap-2
        "
      >

        <MarqueeRow
          icons={iconRows[0]}
          direction="left"
          duration={22}
        />


        <MarqueeRow
          icons={iconRows[1]}
          direction="right"
          duration={28}
        />


        <MarqueeRow
          icons={iconRows[2]}
          direction="left"
          duration={25}
        />


        <MarqueeRow
          icons={iconRows[3]}
          direction="right"
          duration={30}
        />


        <MarqueeRow
          icons={iconRows[4]}
          direction="left"
          duration={26}
        />

      </div>


      {/* Animation CSS */}
      <style>{`

        @keyframes moveLeft {

          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-33.33%);
          }

        }


        @keyframes moveRight {

          from {
            transform: translateX(-33.33%);
          }

          to {
            transform: translateX(0);
          }

        }


        @media(max-width:768px){

          .tech-icon-row{
            gap:12px;
          }

        }

      `}</style>


    </div>
  );
}