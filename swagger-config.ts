import {DocumentBuilder} from "@nestjs/swagger";

export const config = new DocumentBuilder()
    .setTitle("Trello-api")
    .setDescription("Trello-api description")
    .setVersion("1.0")
    .build();