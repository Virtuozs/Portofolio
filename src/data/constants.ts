export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with caution!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};

export const SkillNames = {
  PYTHON: "python",
  PYTORCH: "pytorch",
  NUMPY: "numpy",
  KERAS: "keras",
  PANDAS: "pandas",
  TENSORFLOW: "tensorflow",
  OPENCV: "opencv",
  CPP: "cpp",
  GO: "go",
  DART: "dart",
  CSHARP: "csharp",
  REDIS: "redis",
  GIT: "git",
  GITHUB: "github",
  POSTGRESS: "porstgresql",
  FLUTTER: "flutter",
  FASTAPI: "fastapi",
  RUST: "rust",
  LINUX: "linux",
  DOCKER: "docker",
  NGINX: "nginx",
  HUGGINGFACE: "huggingface",
  VIM: "vim",
  MLFLOW: "mlflow",
} as const;


export type SkillNames = (typeof SkillNames)[keyof typeof SkillNames];

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};

export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.PYTHON]: {
    id: 1,
    name: "python",
    label: "Python",
    shortDescription: "Making indentation a personality trait since the 90s. ✨",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  [SkillNames.PYTORCH]: {
    id: 2,
    name: "pytorch",
    label: "Pytorch",
    shortDescription:
      "For when you want to build Skynet but end up debugging tensors instead. 🧠",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
  },
  [SkillNames.NUMPY]: {
    id: 3,
    name: "numpy",
    label: "Numpy",
    shortDescription: "Turning math into bugs at lightning speed since forever. 🐛",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
  },
  [SkillNames.KERAS]: {
    id: 4,
    name: "keras",
    label: "Keras",
    shortDescription: "When you want to build an AI without actually knowing how. 🧠",
    color: "#563d7c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
  },
  [SkillNames.PANDAS]: {
    id: 5,
    name: "pandas",
    label: "Pandas",
    shortDescription: "Because Excel wasn’t painful enough. 🔪",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },
  [SkillNames.TENSORFLOW]: {
    id: 6,
    name: "tensorflow",
    label: "Tensorflow",
    shortDescription:
      "Built for scalability. Which is great, if your team has 20 engineers and a GCP budget. 💸",
    color: "#41b883",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  [SkillNames.OPENCV]: {
    id: 7,
    name: "opencv",
    label: "OpenCV",
    shortDescription:
      "Where `cv2.imshow()` works… unless it doesn't. 🪄",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original-wordmark.svg",
  },
  [SkillNames.CPP]: {
    id: 8,
    name: "cpp",
    label: "C++",
    shortDescription: `Behaviour is Undefined\nLive with it. ☠️`,
    color: "#38bdf8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  [SkillNames.GO]: {
    id: 9,
    name: "go",
    label: "Go",
    shortDescription: "Write less code? Not in this language. `err != nil` until you die. 🔁",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  },
  [SkillNames.DART]: {
    id: 10,
    name: "dart",
    label: "Dart",
    shortDescription: "Feels like TypeScript and Java had a child and forgot about it. 👶",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  },
  [SkillNames.CSHARP]: {
    id: 11,
    name: "csharp",
    label: "C#",
    shortDescription: "Runs everything at your office, but never gets invited to the cool conferences. 🏢",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  [SkillNames.REDIS]: {
    id: 12,
    name: "redis",
    label: "Redis",
    shortDescription: "RAM is cheap, they said. Use Redis, they said. 💸",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  [SkillNames.GIT]: {
    id: 13,
    name: "git",
    label: "Git",
    shortDescription: `Pro tip:\nIf you rebase after pushing… don’t. Just… don’t. 🙏`,
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  [SkillNames.GITHUB]: {
    id: 14,
    name: "github",
    label: "GitHub",
    shortDescription: "Write YAML. Pray. Retry. Repeat. 🙏",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  [SkillNames.POSTGRESS]: {
    id: 15,
    name: "porstgresql",
    label: "Postgresql",
    shortDescription: "Can do anything. Especially confuse you with its documentation. 📜",
    color: "#f7b93a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  [SkillNames.FLUTTER]: {
    id: 16,
    name: "flutter",
    label: "Flutter",
    shortDescription: "Everything is a widget. Even your sanity. 🧱",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original-wordmark.svg",
  },
  [SkillNames.FASTAPI]: {
    id: 17,
    name: "fastapi",
    label: "Fastapi",
    shortDescription:
      "Generates docs so good, you’ll forget your API doesn’t work. 📜",
    color: "#ffca28",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  [SkillNames.RUST]: {
    id: 18,
    name: "rust",
    label: "Rust",
    shortDescription: "Just wrap it in a Result<Option<Arc<Mutex<Future<()>>>>>, you'll be fine. 👍",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
  },
  [SkillNames.LINUX]: {
    id: 19,
    name: "linux",
    label: "Linux",
    shortDescription: "Boots in 3 seconds. Spends 3 hours fixing X11 config. 🔧",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  [SkillNames.DOCKER]: {
    id: 20,
    name: "docker",
    label: "Docker",
    shortDescription: "`docker-compose up` \n-and hope. 🔥",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  [SkillNames.NGINX]: {
    id: 21,
    name: "nginx",
    label: "NginX",
    shortDescription: "Syntax so simple, it requires 12 tabs of documentation. 📖",
    color: "#008000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  },
  [SkillNames.HUGGINGFACE]: {
    id: 22,
    name: "huggingface",
    label: "Huggingface",
    shortDescription:
      "Pretrained, open-source, and totally unusable without cloud credits. 💸",
    color: "#ff9900",
    icon: "https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo.svg",
  },
  [SkillNames.VIM]: {
    id: 23,
    name: "vim",
    label: "Vim",
    shortDescription: "exit? In this economy? Ight, imma head out! 🚪🏃",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg",
  },
  [SkillNames.MLFLOW]: {
    id: 24,
    name: "mlflow",
    label: "ML Flow",
    shortDescription:
      "Yes, it logs your metrics. No, it doesn’t explain why your model failed. 🤷‍♂️",
    color: "#6cc24a",
    icon: "https://brandfetch.com/mlflow.org?view=library&library=default&collection=logos&asset=idOeRd2gAI&utm_source=https%253A%252F%252Fbrandfetch.com%252Fmlflow.org&utm_medium=copyAction&utm_campaign=brandPageReferral",
  },
};
