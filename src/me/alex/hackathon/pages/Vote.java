package me.alex.hackathon.pages;

import java.io.IOException;

import me.alex.hackathon.database.Database;
import me.alex.hackathon.database.Post;

public class Vote extends Page {

	@Override
	public String getURL() {
		return "/vote";
	}

	@Override
	public String generateResponse(String body) {
		long postId = Long.valueOf(body.split(",")[0]);
		long newState = Long.valueOf(body.split(",")[1]);
		for (Post post : Database.getAllPosts()) {
			if (post.id == postId) {
				long currState = post.voteState;
				if (currState == 0 && newState == 1) {
					post.numUpvotes++;
				} else if (currState == 0 && newState == 2) {
					post.numDownvotes++;
				} else if (currState == 1 && newState == 2) {
					post.numUpvotes--;
					post.numDownvotes++;
				} else if (currState == 2 && newState == 1) {
					post.numDownvotes--;
					post.numUpvotes++;
				} else if (currState == 1 && newState == 0) {
					post.numUpvotes--;
				} else if (currState == 2 && newState == 0) {
					post.numDownvotes--;
				}
				post.voteState = newState;
				try {
					Database.saveAllPosts();
				} catch (IOException e) {
					e.printStackTrace();
				}
				return "{\"voted\": true}";
			}
		}
		return "{\"error\": \"Post does not exist\"}";
	}

}
