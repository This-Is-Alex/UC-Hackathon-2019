package me.alex.hackathon.database;

import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Database {

	private static List<Post> posts = new ArrayList<Post>();
	
	public static List<Post> getAllPosts(){
		Collections.sort(posts);
		return posts;
	}
	
	public static void saveAllPosts() throws IOException {
		JSONArray array = new JSONArray();
		for (Post post : posts) {
			array.add(Post.toObject(post));
		}
		String output = array.toJSONString();
		FileOutputStream out = new FileOutputStream("data.bin");
		out.write(output.getBytes());
		out.close();
	}
	
	public static void loadAllPosts() throws IOException, ParseException {
		JSONParser parser = new JSONParser();
		Object o = parser.parse(new FileReader("data.bin"));
		if (o instanceof JSONArray) {
			List<Post> posts = new ArrayList<Post>();
			for (Object obj : ((JSONArray)o)) {
				posts.add(Post.fromObject((JSONObject)obj));
			}
		}
	}
}
