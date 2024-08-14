import "reflect-metadata";
import './ioc/root'
import { container } from "tsyringe";
import { Server } from "./express-server/server";

const server = container.resolve(Server);
server.listen(3000);