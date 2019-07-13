package me.alex.hackathon.pages;

import java.io.IOException;

import me.alex.hackathon.database.Comment;
import me.alex.hackathon.database.Database;
import me.alex.hackathon.database.Post;

public class AddComment extends Page {

	@Override
	public String getURL() {
		return "/makeComment";
	}

	@Override
	public String generateResponse(String body) {
		try {
			long postId = Long.parseLong(body.split("~~~")[0]);
			String content = body.split("~~~")[1];
			long time = System.currentTimeMillis();
			Comment comment = new Comment(content, time);
			for (Post post : Database.getAllPosts()) {
				if (post.id == postId) {
					post.comments.add(comment);
					Database.saveAllPosts();
					return "Success";
				}
			}
			return "Error post does not exist";
		} catch (IOException e) {
			e.printStackTrace();
			return "Error saving";
		}
	}

}
