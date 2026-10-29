import ResumeModel from "../models/resume-model.js";
import mailService from "./mail-service.js";

class UserService {
  async sendResume(formResponse) {
    await ResumeModel.create({ ...formResponse });
    await mailService.sendResume(formResponse);

    return { message: "Резюме успішно надіслано" };
  }
}

export default new UserService();
