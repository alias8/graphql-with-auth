import { App } from "./app";
import { AuthenticationController } from "./services/authController";

const app = new App([new AuthenticationController()]);

app.listen();