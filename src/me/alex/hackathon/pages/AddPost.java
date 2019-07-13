package me.alex.hackathon.pages;

import me.alex.hackathon.database.Post;

public class AddPost extends Page {

	@Override
	public String getURL() {
		return "/createPost";
	}

	@Override
	public String generateResponse(String body) {
		String url = body.split("~~~")[0];
		String title = body.split("~~~")[1];
		
		Post.newPost(title, url);
		
		return "Success";
	}

	
}
