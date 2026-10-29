import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import ejs from 'ejs';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
dotenv.config();
dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.locale('uk');   

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

class MailService {
  constructor () {
    console.log('SMTP:', process.env.SMTP_USER, process.env.SMTP_PASSWORD?.length);
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const imagePath = path.join(__dirname, '..', 'images');
    this.logoSvg   = fs.readFileSync(path.join(imagePath, 'logo.svg'), 'utf8');
    this.otterPng  = fs.readFileSync(path.join(imagePath, 'otter-gift.png'));
    this.logoDataUri  = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(this.logoSvg)}`;
    this.otterDataUri = `data:image/png;base64,${this.otterPng.toString('base64')}`;
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активація акаунта на ${process.env.API_URL}`,
      text: '',
      html:
      `
        <div>
          <h1>Для активації перейдіть по посиланню</h1>
          <a href="${link}">${link}</a>
        </div>
      `
    })
  }

  async sendResume(formResponse) {
    const {
      fullName,
      phone,
      email,
      experienceYears,
      education,
      about,
      availability,
      profileLink,
      motivation
    } = formResponse;

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `Нове заявка на працевлаштування від ${fullName}`,
      text: '',
      html:
      `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Нова заявка на працевлаштування</h2>
          <p><strong>ПІБ:</strong> ${fullName}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Досвід роботи (років):</strong> ${experienceYears}</p>
          <p><strong>Освіта:</strong> ${education}</p>
          <p><strong>Про себе:</strong> ${about}</p>
          <p><strong>Бажання працювати:</strong> ${availability}</p>
          <p><strong>Посилання на профіль/резюме:</strong> <a href="${profileLink}" target="_blank">${profileLink}</a></p>
          <p><strong>Мотивація:</strong> ${motivation}</p>
        </div>
      `
    })
  }

  async sendVictimRequest(formResponse) {
    const {
      user,
      type,
      description,
      fileUrl,
    } = formResponse;

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `Нове заявка на верифікацію від ${user.name}`,
      text: '',
      html:
      `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Нова заявка на верифікацію</h2>
          <p><strong>ID користувача:</strong> ${user._id}</p>
          <p><strong>Ім'я:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Статус:</strong> ${type}</p>
          <p><strong>Опис:</strong> ${description}</p>
          <p><strong>Посилання на файл:</strong> <a href="${fileUrl}" target="_blank">${fileUrl}</a></p>
        </div>
      `
    })
  }

  async sendVictimVerify(user, status) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: `Новий статус заявки на платфморі`,
      text: '',
      html:
      `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Новий статус заявки на платфморі</h2>
          <p><strong>Статус:</strong> ${status}</p>
        </div>
      `
    })
  }

  async sendGift({ to, from, email, amount, expirationDate, code }) {
    const templatePath = path.join(__dirname, '..', 'templates', 'certificate.ejs');

    const html = await ejs.renderFile(templatePath, {
      to,
      from,
      amount,
      expirationDate,
      code,
      logoDataUri: this.logoDataUri,
      otterDataUri: this.otterDataUri
    });

    const browser = await (await import('puppeteer')).launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      format: 'A5',
      printBackground: true,
      margin: { top: '0', bottom: '0', left: '0', right: '0' },
    });
    await browser.close();

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Ваш подарунковий сертифікат',
      text: 'Будь ласка, відкрийте прикріплений PDF для перегляду сертифіката.',
      attachments: [
        {
          filename: 'certificate.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        }
      ],
    });
  }

  async sendInfoAboutSession(session) {
    const { _id, scheduledAt, user, specialist } = session

    const appointmentUserUrl = `${process.env.CLIENT_URL}/user/appointments/${_id}`
    const appointmentSpecialistUrl = `${process.env.CLIENT_URL}/specialist/appointments/${_id}`
    const videoUserUrl = `${process.env.CLIENT_URL}/user/video-call/${_id}`
    const videoSpecialistUrl = `${process.env.CLIENT_URL}/specialist/video-call/${_id}`

    const start = dayjs.utc(scheduledAt)
    const end = start.add(50, 'minute')
    const whenLine = `${start.format('dddd, D MMM YYYY · h:mm a')} – ${end.format('h:mm a')} (Eastern European Time - Kyiv)`

    const userHtml = `
      <div style="font-family: Arial, sans-serif; line-height:1.4; color:#333;">
        <p><strong>Терапевт</strong> – ${specialist.user.name}</p>
        <p><strong>Сторінка сеансу</strong> – <a href="${appointmentUserUrl}">${appointmentUserUrl}</a></p>

        <h4 style="margin-top:24px;">Коли?</h4>
        <p>${whenLine}</p>

        <h4 style="margin-top:24px;">Посилання на зустріч</h4>
        <p><a href="${videoUserUrl}">${videoUserUrl}</a></p>
      </div>
    `

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to:   user.email,
      subject: `Ваш сеанс з ${specialist.user.name} ${whenLine}`,
      html: userHtml,
    })

    const specialistHtml = `
      <div style="font-family: Arial, sans-serif; line-height:1.4; color:#333;">
        <p><strong>Людина, що потребує допомоги</strong> – ${user.name}</p>
        <p><strong>Сторінка сеансу</strong> – <a href="${appointmentSpecialistUrl}">${appointmentSpecialistUrl}</a></p>

        <h4 style="margin-top:24px;">Коли?</h4>
        <p>${whenLine}</p>

        <h4 style="margin-top:24px;">Посилання на зустріч</h4>
        <p><a href="${videoSpecialistUrl}">${videoSpecialistUrl}</a></p>
      </div>
    `

    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to:   specialist.user.email,
      subject: `Ваш сеанс з ${user.name} ${whenLine}`,
      html: specialistHtml,
    })
  }

  async sendInfoAboutRefund(session) {
    const { _id, scheduledAt, user, specialist } = session

    const start = dayjs.utc(scheduledAt)
    const end = start.add(50, 'minute')
    const whenLine = `${start.format('dddd, D MMM YYYY · h:mm a')} – ${end.format('h:mm a')} (Eastern European Time - Kyiv)`

    const appointmentUserUrl = `${process.env.CLIENT_URL}/user/appointments/${_id}`
    const appointmentSpecialistUrl = `${process.env.CLIENT_URL}/specialist/appointments/${_id}`

    const userHtml = `
      <div style="font-family: Arial, sans-serif; line-height:1.4; color:#333;">
        <h3>Сеанс скасовано</h3>
        <p>Ваш сеанс з <strong>${specialist.user.name}</strong>, запланований на <strong>${whenLine}</strong>, успішно скасовано.</p>
        <p>Повернення коштів буде здійснено протягом <strong>5–10 робочих днів</strong>.</p>
        <p>Деталі можна переглянути за посиланням:</p>
        <p><a href="${appointmentUserUrl}">${appointmentUserUrl}</a></p>
      </div>
    `

    await this.transporter.sendMail({
      from:    process.env.SMTP_USER,
      to:      user.email,
      subject: `Ваш сеанс з ${specialist.user.name} ${whenLine} скасовано`,
      html:    userHtml,
    })

    const specialistHtml = `
      <div style="font-family: Arial, sans-serif; line-height:1.4; color:#333;">
        <h3>Сесія скасована</h3>
        <p>Сесія з користувачем <strong>${user.name}</strong>, запланована на <strong>${whenLine}</strong>, була скасована.</p>
        <p>Будь ласка, перевірте свій дашборд.</p>
        <p>Деталі сесії: <a href="${appointmentSpecialistUrl}">${appointmentSpecialistUrl}</a></p>
      </div>
    `

    await this.transporter.sendMail({
      from:    process.env.SMTP_USER,
      to:      specialist.user.email,
      subject: `Сесія з ${user.name} ${whenLine} скасована`,
      html:    specialistHtml,
    })
  }

  async sendInfoAboutCancel(session) {
    const { _id, scheduledAt, user, specialist } = session

    const start = dayjs.utc(scheduledAt)
    const end = start.add(50, 'minute')
    const whenLine = `${start.format('dddd, D MMM YYYY · h:mm a')} – ${end.format('h:mm a')} (Eastern European Time - Kyiv)`

    const appointmentUserUrl = `${process.env.CLIENT_URL}/user/appointments/${_id}`
    const appointmentSpecialistUrl = `${process.env.CLIENT_URL}/specialist/appointments/${_id}`

    const userHtml = `
      <div style="font-family: Arial, sans-serif; line-height:1.4; color:#333;">
        <h3>Сеанс скасовано</h3>
        <p>Ваш сеанс з <strong>${specialist.user.name}</strong>, запланований на <strong>${whenLine}</strong>, скасовано.</p>
        <p>Деталі можна переглянути за посиланням:</p>
        <p><a href="${appointmentUserUrl}">${appointmentUserUrl}</a></p>
      </div>
    `

    await this.transporter.sendMail({
      from:    process.env.SMTP_USER,
      to:      user.email,
      subject: `Ваш сеанс з ${specialist.user.name} ${whenLine} скасовано`,
      html:    userHtml,
    })

    const specialistHtml = `
      <div style="font-family: Arial, sans-serif; line-height:1.4; color:#333;">
        <h3>Сесія скасована</h3>
        <p>Сесія з користувачем <strong>${user.name}</strong>, запланована на <strong>${whenLine}</strong>, була скасована.</p>
        <p>Будь ласка, перевірте свій дашборд.</p>
        <p>Деталі сесії: <a href="${appointmentSpecialistUrl}">${appointmentSpecialistUrl}</a></p>
      </div>
    `

    await this.transporter.sendMail({
      from:    process.env.SMTP_USER,
      to:      specialist.user.email,
      subject: `Сесія з ${user.name} ${whenLine} скасована`,
      html:    specialistHtml,
    })
  }

  async sendInfoAboutSessionMove(session, oldWhenLine) {
    const { _id, scheduledAt, user, specialist } = session

    const start = dayjs.utc(scheduledAt)
    const end = start.add(50, 'minute')
    const whenLine = `${start.format('dddd, D MMM YYYY · h:mm a')} – ${end.format('h:mm a')} (Eastern European Time - Kyiv)`

    const appointmentUserUrl = `${process.env.CLIENT_URL}/user/appointments/${_id}`
    const appointmentSpecialistUrl = `${process.env.CLIENT_URL}/specialist/appointments/${_id}`

    const userHtml = `
      <div style="font-family: Arial, sans-serif; line-height:1.4; color:#333;">
        <h3>Сеанс перенесено</h3>
        <p>Ваш сеанс з <strong>${specialist.user.name}</strong>, запланований на <strong>${oldWhenLine}</strong>, перенесено на <strong>${whenLine}</strong>.</p>
        <p>Деталі можна переглянути за посиланням:</p>
        <p><a href="${appointmentUserUrl}">${appointmentUserUrl}</a></p>
      </div>
    `

    await this.transporter.sendMail({
      from:    process.env.SMTP_USER,
      to:      user.email,
      subject: `Ваш сеанс з ${specialist.user.name} ${whenLine} перенесено`,
      html:    userHtml,
    })

    const specialistHtml = `
      <div style="font-family: Arial, sans-serif; line-height:1.4; color:#333;">
        <h3>Сесію перенесено</h3>
        <p>Сесія з користувачем <strong>${user.name}</strong>, запланована на <strong>${oldWhenLine}</strong>, була перенесена на <strong>${whenLine}</strong>.</p>
        <p>Будь ласка, перевірте свій дашборд.</p>
        <p>Деталі сесії: <a href="${appointmentSpecialistUrl}">${appointmentSpecialistUrl}</a></p>
      </div>
    `

    await this.transporter.sendMail({
      from:    process.env.SMTP_USER,
      to:      specialist.user.email,
      subject: `Сесія з ${user.name} ${whenLine} перенесена`,
      html:    specialistHtml,
    })
  }

   async sendSessionReminder(session) {
    const { _id, scheduledAt, user, specialist } = session

    const start = dayjs.utc(scheduledAt)
    const end   = start.add(50, 'minute')
    const when  = `${start.format('dddd, D MMMM YYYY, HH:mm')} – ${end.format('HH:mm')} (Kyiv)`

    const userUrl       = `${process.env.CLIENT_URL}/user/appointments/${_id}`
    const specialistUrl = `${process.env.CLIENT_URL}/specialist/appointment/${_id}`

    const userHtml = `
      <div style="font-family: Arial, sans-serif; line-height:1.4; color:#333;">
        <h2>Нагадування про сеанс</h2>
        <p>Ваш сеанс з <strong>${specialist.user.name}</strong> заплановано на:</p>
        <p><em>${when}</em></p>
        <p>Переглянути деталі та приєднатися:</p>
        <p><a href="${userUrl}">${userUrl}</a></p>
      </div>
    `

    const specialistHtml = `
      <div style="font-family: Arial, sans-serif; line-height:1.4; color:#333;">
        <h2>Нагадування про сеанс</h2>
        <p>Сеанс з клієнтом <strong>${user.name}</strong> заплановано на:</p>
        <p><em>${when}</em></p>
        <p>Переглянути деталі:</p>
        <p><a href="${specialistUrl}">${specialistUrl}</a></p>
      </div>
    `

    await this.transporter.sendMail({
      from:    process.env.SMTP_USER,
      to:      user.email,
      subject: `Нагадування: сеанс з ${specialist.user.name} о ${start.format('HH:mm')}`,
      html:    userHtml,
    })

    await this.transporter.sendMail({
      from:    process.env.SMTP_USER,
      to:      specialist.user.email,
      subject: `Нагадування: сеанс з ${user.name} о ${start.format('HH:mm')}`,
      html:    specialistHtml,
    })
  }
}

export default new MailService();
