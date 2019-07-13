package me.alex.hackathon.pages;

import java.io.IOException;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

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
			JSONParser parser = new JSONParser();
			Object o = parser.parse(body);
			JSONObject obj = (JSONObject) o;
			long postId = (long) obj.get("id");
			String content = obj.get("text").toString();
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
		} catch (ParseException | ClassCastException e) {
			e.printStackTrace();
			return "Error with input";
		} catch (IOException e) {
			e.printStackTrace();
			return "Error saving";
		}
	}

}
