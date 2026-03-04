import { BasePage } from './BasePage';

/**
 * Login Page Object
 * Handles all login-related interactions
 */
export class LoginPage extends BasePage {
  private readonly loginUrl = 'https://es-web-qa.h2c-ai.dev/public/login';
  private readonly emailFieldSelector = ':text("Email Address")';
  private readonly passwordFieldSelector = ':text("Password")';

  /**
   * Navigate to login page
   */
  async navigateToLoginPage() {
    await this.goto(this.loginUrl);
  }

  /**
   * Fill email address
   */
  async fillEmail(email: string) {
    await this.page.getByText('Email Address').fill(email);
  }

  /**
   * Fill password
   */
  async fillPassword(password: string) {
    await this.page.getByText('Password').fill(password);
  }

  /**
   * Click login button
   */
  async clickLoginButton() {
    await this.clickButtonByName('Login');
  }

  /**
   * Perform complete login workflow
   */
  async login(email: string, password: string) {
    await this.navigateToLoginPage();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }
}
