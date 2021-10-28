import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";

type SuccessfulResponse<T> = { data: T; error?: never; statusCode?: number };
type UnsuccessfulResponse<E> = { data?: never; error: E; statusCode?: number };

type ApiResponse<T, E = unknown> =
  | SuccessfulResponse<T>
  | UnsuccessfulResponse<E>;

interface NextConnectApiRequest extends NextApiRequest {
  file: Express.Multer.File;
}
type ResponseData = ApiResponse<string, string>;

const upload = multer({
  limits: { fileSize: 2000000 },
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    const acceptFile: boolean = ["application/json"].includes(file.mimetype);

    cb(null, acceptFile);
  },
});

const route = nextConnect({
  onError(
    error,
    _req: NextConnectApiRequest,
    res: NextApiResponse<ResponseData>
  ) {
    res.status(501).json({ error: error.message });
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});

route.use(upload.single("report"));

route.post((req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
  const data = req.file.buffer.toString("utf8");
  const json = JSON.parse(data);

  const categories: any = {
    Actions: "🎬",
    Good: "☀️",
    Bad: "🌧️",
    Start: "🚀",
    Stop: "🛑",
    Liked: "😀",
    Learned: "🧐",
    Lacked: "😞",
    "Longed For": "🤔",
    "Sunny Skies": "☀️",
    "Storm Clouds": "⛈️",
    "Hot Air": "♨️",
    Sandbags: "🗿",
    Goal: "🎯",
    Wind: "💨",
    Rocks: "🗿",
    Anchor: "⚓",
    Engine: "⚙️",
    Parachute: "🪂",
    "More Of": "☑️",
    "Less Of": "❌",
    "Keep Doing": "♻️",
    "Start Doing": "🚀",
    "Stop Doing": "🛑",
    Sidekick: "🙋",
    Weakness: "😓",
    "Super Power": "💪",
    Added: "☑️",
    Removed: "❌",
    Recycle: "♻️",
    "Didn't Work": "📉",
    "Kinda Worked": "📊",
    "Worked Well": "📈",
    Mad: "😡",
    Glad: "😀",
    Sad: "😭",
    Drop: "🎤",
    Improve: "🏗️",
    Keep: "♻️",
    Add: "☑️",
    Continue: "♻️",
    Plus: "☑️",
    Interesting: "🤔",
    Minus: "❌",
    Recognition: "🏆",
    "Thumbs Down": "👎",
    "Thumbs Up": "👍",
    "New Ideas": "💡",
    Bridge: "🌉",
    Abyss: "⚠️",
    Hopes: "🙏",
    Concerns: "😟",
    Risks: "⚠️",
    Issues: "🔥",
    Assumptions: "🙈",
    Dependencies: "🔗",
    Strengths: "💪",
    Weaknesses: "😓",
    Opportunities: "💡",
    Threats: "⚠️",
  };

  let result = "";

  const appendCategory = (category: string) => {
    result = result.concat("\n\n", `${categories[category]} ${category}`);
  };

  const appendItems = (category: string) => {
    json[category].forEach((item: any) => {
      result = result.concat("\n", `- ${item.content}`);
    });
  };

  Object.keys(json).forEach((category: string) => {
    if (category !== "Actions") {
      appendCategory(category);
      appendItems(category);
    }
  });

  Object.keys(json).forEach((category: string) => {
    if (category === "Actions") {
      appendCategory(category);
      appendItems(category);
    }
  });

  res.status(200).json({ data: result });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default route;
