import type { IRouter } from "express";
import { Router } from "express";
import { uploadFile } from "../controllers/upload-file";
import { uploadText } from "../controllers/upload-text";
import { getEmbeddings } from "../controllers/embeddings";
import { userFiles } from "../controllers/user-files";
import { deleteFile } from "../controllers/delete-file";
import { resyncFile } from "../controllers/resync-file";
import { upload } from "../middleware/upload";
import { apiKeyAuth } from "../middleware/auth";
import { apiUsageLimit } from "../middleware/api-usage-limit";
import { validateRequestMiddleware as validateDeleteRequestMiddleware } from "../middleware/delete-file/validate-request";
import { validateRequestMiddleware as validateResyncRequestMiddleware } from "../middleware/resync-file/validate-request";

export const router: IRouter = Router();

router.post(
  "/upload_file",
  apiKeyAuth(),
  apiUsageLimit(),
  upload.single("file"),
  uploadFile,
);
router.post("/upload_text", apiKeyAuth(), apiUsageLimit(), uploadText);
router.post("/embeddings", apiKeyAuth(), apiUsageLimit(), getEmbeddings);
router.post("/user_files", apiKeyAuth(), apiUsageLimit(), userFiles);
router.post(
  "/delete_file",
  apiKeyAuth(),
  apiUsageLimit(),
  validateDeleteRequestMiddleware(),
  deleteFile,
);
router.post(
  "/resync_file",
  apiKeyAuth(),
  apiUsageLimit(),
  validateResyncRequestMiddleware(),
  resyncFile,
);
