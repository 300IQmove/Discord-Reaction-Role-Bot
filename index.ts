import { ReactionRoleClient } from "./src/client";
import * as config from "./config.json";

const client = new ReactionRoleClient({
  ownerID: config.ownerID,
  restTimeOffset: 0,
  disableMentions: "everyone",
  restWsBridgetimeout: 100,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.login(config.token);
