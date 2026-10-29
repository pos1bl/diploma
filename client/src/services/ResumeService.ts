import $api from "../http";
import { IResume } from '@models/IResume';

export default class ResumeService {
  static async sendResume(formResponse: IResume): Promise<void> {
    return $api.post('send_resume', { formResponse });
  }
}
