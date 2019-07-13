package me.alex.hackathon.database;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class Post implements Comparable<Post> {

	public final long id;
	public final String title;
	public final String url;
	public final long createTime;
	public int numUpvotes = 0;
	public int numDownvotes = 0;
	public List<Comment> comments;
	public List<String> sources;
	public long voteState = 0; //should be a list in production
	
	
	private Post(long id, String title, String url, long createTime) {
		this(id, title, url, createTime, 0, 0);
	}
	
	private Post(long id, String title, String url, long createTime, int upvotes, int downvotes) {
		this(id, title, url, createTime, upvotes, downvotes, new ArrayList<Comment>(), new ArrayList<String>());
		sources.add(url);
	}
	
	private Post(long id, String title, String url, long createTime, int upvotes, int downvotes, List<Comment> comments, List<String> sources) {
		this.id = id;
		this.title = title;
		this.url = url;
		this.createTime = createTime;
		this.numUpvotes = upvotes;
		this.numDownvotes = downvotes;
		this.comments = comments;
		this.sources = sources;
		
		Database.getAllPosts().add(this);
		try {
			Database.saveAllPosts();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	public int getScore() {
		long postAge = System.currentTimeMillis() - createTime;
		int postAgePerUnit = 1 + (int) (postAge / 3600000); //3600000ms in an hour
		System.out.println(title + " is "+postAgePerUnit+"-1 hours old");
		int popularity = 20 * (numUpvotes + numDownvotes);
		System.out.println(popularity / postAgePerUnit);
		return popularity / postAgePerUnit;
	}
	
	
	
	
	
	
	
	public static Post newPost(String title, String url) {
		long id = System.currentTimeMillis();
		Post post = new Post(id, title, url, id);
		return post;
	}
	
	public static JSONObject toObject(Post post) {
		JSONObject obj = new JSONObject();
		obj.put("id", post.id);
		obj.put("title", post.title);
		obj.put("url", post.url);
		obj.put("upvotes", post.numUpvotes);
		obj.put("downvotes", post.numDownvotes);
		obj.put("voteState", post.voteState);
		
		JSONArray comments = new JSONArray();
		for (Comment comment : post.comments) {
			JSONObject commentObject = new JSONObject();
			commentObject.put("time", comment.getTime());
			commentObject.put("text", comment.getContent());
			comments.add(commentObject);
		}
		obj.put("comments", comments);
		
		JSONArray sources = new JSONArray();
		sources.addAll(post.sources);
		obj.put("sources", sources);
		
		obj.put("createTime", post.createTime);
		return obj;
	}
	
	public static Post fromObject(JSONObject obj) {
		//private Post(long id, String title, String url, long createTime, int upvotes, int downvotes, List<Comment> comments, List<String> sources) {
		long id = (long) obj.get("id");
		String title = obj.get("title").toString();
		String url = obj.get("url").toString();
		int upvotes = ((Long) obj.get("upvotes")).intValue();
		int downvotes = ((Long) obj.get("downvotes")).intValue();
		
		JSONArray comments = (JSONArray) obj.get("comments");
		List<Comment> commentList = new ArrayList<Comment>();
		
		for (Object o : comments) {
			JSONObject ob = (JSONObject) o;
			long when = (long) ob.get("time");
			String commentText = ob.get("text").toString();
			Comment comment = new Comment(commentText, when);
			commentList.add(comment);
		}
		
		JSONArray sources = (JSONArray) obj.get("sources");
		List<String> sourceList = new ArrayList<String>();
		for (Object o : sources) {
			String sourceUrl = o.toString();
			sourceList.add(sourceUrl);
		}
		
		long time = (long) obj.get("createTime");
		
		Post post = new Post(id, title, url, time, upvotes, downvotes, commentList, sourceList);
		if (obj.containsKey("voteState"))
			post.voteState = (long) obj.get("voteState");
		return post;
	}

	@Override
	public int compareTo(Post arg0) {
		return new Integer(this.getScore()).compareTo(arg0.getScore());
	}
}
