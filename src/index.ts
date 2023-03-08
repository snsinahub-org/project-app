import { Probot } from "probot";
import  GetItems  from './libs/getProjItems';

let items = new GetItems();

export = (app: Probot) => {
  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    await context.octokit.issues.createComment(issueComment);
  });

  app.on("projects_v2_item", async (context) => {
    
    app.log.info(context);
    let what = await items.getProItems(context)

    console.log("PR2 ", context.payload.projects_v2_item.node_id)
    console.log("WHAT", JSON.stringify(what))
  });

  // app.on("projects_v2_item.edited", async (context) => {
  //   console.log("EDITED")
  //   app.log.info(context);
  //   console.log("PR22 ", context.payload.projects_v2_item.node_id)
  // });

  console.log("called")
  
};
