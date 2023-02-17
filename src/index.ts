import { Probot } from "probot";

export = (app: Probot) => {
  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    await context.octokit.issues.createComment(issueComment);
  });

  app.on("projects_v2_item.created", async (context) => {
    
    app.log.info(context);
  });

  app.on("projects_v2_item.edited", async (context) => {
    
    app.log.info(context);
  });
  
};
