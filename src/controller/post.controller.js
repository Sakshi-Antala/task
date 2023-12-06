const status = require("http-status");
const postService = require("../services/post.services");
const APIResponse = require("../../utils/helpers/APIResponse");
const jwt = require("jsonwebtoken");

class PostController {
  async createpost(req, res) {
    const data = await postService.createpost(req.user,req.body);
    if (data) {
      console.log("post Data Create API", data);
      return res
        .status(status.OK)
        .json(new APIResponse("post Created Successfully", true, 200, data));
    } else {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json(new APIResponse("Failed to create post", false, 500));
    }
  }

  async getpost(req, res) {
    const data = await postService.getpost(req.user);
    if (data) {
      console.log("post Data Get API", data);
      return res
        .status(status.OK)
        .json(new APIResponse("post Get Successfully", true, 200, data));
    } else {
      return res
        .status(status.BAD_REQUEST)
        .json(new APIResponse("No Post Found", false, 400));
    }
  }

  async updatepost(req, res) {
    const data = await postService.updatepost(req.params.id, req.body);
    if (data) {
      console.log("Post Data Update API", data);
      return res
        .status(status.OK)
        .json(new APIResponse("Post Updated Successfully", true, 200, data));
    } else {
      console.log("failed to updating post");
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json(new APIResponse("failed to updating Post", false, 500));
    }
  }

  async deletepost(req, res) {
    const data = await postService.deletepost(req.params.id);
    if (data) {
      console.log("Post Data Delete API", data);
      return res
        .status(status.OK)
        .json(new APIResponse("Post Deleted Successfully", true, 200, data));
    } else {
      console.log("failed to deleteing Post");
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json(new APIResponse("failed to deleteing Post", false, 500));
    }
  }

  async managepoststatus(req, res) {
    const data = await postService.managepoststatus(req.params.id,req.query);
    if (data) {
      console.log("Manage Post Status API", data);
      return res
        .status(status.OK)
        .json(new APIResponse("Post Status Updated Successfully", true, 200, data));
    } else {
      console.log("failed to manage Post status");
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json(new APIResponse("failed to manage Post status", false, 500));
    }
  }

  async getpostcounter(req, res) {
    const data = await postService.getpostcounter();
    if (data) {
      console.log("Get Post Counter API", data);
      return res
        .status(status.OK)
        .json(new APIResponse("Status Wise Post", true, 200, data));
    } else {
      console.log("failed to count Post");
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json(new APIResponse("failed to count Post", false, 500));
    }
  }
}

module.exports = new PostController();
