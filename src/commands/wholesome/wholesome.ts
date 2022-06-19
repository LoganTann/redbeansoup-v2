import Command from "framework/decorators/Command.ts";
import IWholesomeInfo from "./IWholesomeInfo.ts";
import reactionFactory from "./reactionFactory.ts";

function generateAndDeployWholesomeCommands(reactions: IWholesomeInfo[]) {
    for (const reaction of reactions) {
        Command(reactionFactory(reaction));
    }
}

const wholesomeInfo = [
    {
        name: "blush",
        description: "Blush. Just blush.",
        singleTitle: "*{sender} is blushing*",
    },
    {
        name: "cry",
        description: "Cry. Just cry.",
        singleTitle: "*{sender} is crying*",
    },
    {
        name: "handhold",
        description: "Hold the hands (of someone)",
        singleTitle: "*holding hands*",
        targetedUser: {
            argDescription: "User to hold",
            replyDescription: "{sender} holds the hands of {target}",
        },
    },
    {
        name: "highfive",
        description: "Do a highfive (with someone)",
        singleTitle: "*Doing a highfive*",
        targetedUser: {
            argDescription: "User to highfive",
            replyDescription: "{sender} highfives {target}",
        },
    },
    {
        name: "pat",
        description: "Pat (someone)",
        singleTitle: "*pat pat*",
        targetedUser: {
            argDescription: "User to pat",
            replyDescription: "{sender} pats {target}",
        },
    },
    {
        name: "hug",
        description: "Hug (someone)",
        singleTitle: "*strongly giving a hug*",
        targetedUser: {
            argDescription: "User to hug",
            replyDescription: "{sender} hug {target}",
        },
    },
    {
        name: "punch",
        description: "Punch (someone)",
        singleTitle: "*punch*",
        targetedUser: {
            argDescription: "User to punch",
            replyDescription: "{sender} punches {target}",
        },
    },
    {
        name: "shut",
        apiName: "chut",
        description: "Kindly tell someone to stop talking",
        singleTitle: "*shhhhh...*",
        targetedUser: {
            argDescription: "User to be quieted",
            replyDescription: "shhhh, {target}",
        },
    },
    {
        name: "slap",
        description: "Slap (someone)",
        singleTitle: "*slap*",
        targetedUser: {
            argDescription: "User to slap",
            replyDescription: "{sender} slaps {target}",
        },
    },
];

generateAndDeployWholesomeCommands(wholesomeInfo);
