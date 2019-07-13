package me.alex.hackathon.pages;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import me.alex.hackathon.database.Database;
import me.alex.hackathon.database.Post;

public class TopPosts extends Page {

	@Override
	public String getURL() {
		return "/topPosts";
	}

	@SuppressWarnings("unchecked")
	@Override
	public String generateResponse(String body) {
		JSONObject response = new JSONObject();
		
		JSONArray array = new JSONArray();
		
		for (Post post : Database.getAllPosts()) {
			array.add(post(post));
		}
		
		response.put("numPosts", array.size());
		response.put("posts", array);
		return response.toJSONString();
	}
	
	private JSONObject post(Post post) {
		JSONObject post1 = new JSONObject();
		post1.put("id", post.id);
		post1.put("title", post.title);
		post1.put("url", post.url);
		post1.put("upvotes",post.numUpvotes);
		post1.put("downvotes", post.numDownvotes);
		post1.put("numComments", post.comments.size());
		post1.put("numSources", post.sources.size());
		post1.put("voteStatus", post.voteState);
		long age = System.currentTimeMillis() - post.createTime;
		String ageStr = "";
		if (age < 60000) {
			ageStr = "just now";
		} else if (age < 3600000) {
			ageStr = (age / 60000) + " minutes ago";
		} else if (age < 86400000) {
			ageStr = (age / 3600000) + " hours ago";
		} else {
			ageStr = (age / 86400000) + " days ago";
		}
		post1.put("age", ageStr);
		return post1;
	}

}
