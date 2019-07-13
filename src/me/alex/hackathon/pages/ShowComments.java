package me.alex.hackathon.pages;

import java.util.Collections;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import me.alex.hackathon.database.Comment;
import me.alex.hackathon.database.Database;
import me.alex.hackathon.database.Post;

public class ShowComments extends Page {

	@Override
	public String getURL() {
		return "/showComments";
	}

	@Override
	public String generateResponse(String body) {
		long postId = Long.valueOf(body);
		for (Post post : Database.getAllPosts()) {
			if (post.id == postId) {
				JSONArray arr = new JSONArray();
				Collections.sort(post.comments);
				for (Comment comment : post.comments) {
					JSONObject ob = new JSONObject();
					long age = System.currentTimeMillis() - comment.getTime();
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
					ob.put("commentId", comment.getTime());
					ob.put("age", ageStr);
					ob.put("text", comment.getContent());
					arr.add(ob);
				}
				JSONObject returning = new JSONObject();
				returning.put("numComments", arr.size());
				returning.put("comments", arr);
				returning.put("postId", postId);
				return returning.toJSONString();
			}
		}
		return "Error post id not found";
	}

}
