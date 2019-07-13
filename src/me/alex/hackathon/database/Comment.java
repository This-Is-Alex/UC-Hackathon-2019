package me.alex.hackathon.database;

public class Comment implements Comparable<Comment>{

	private String content;
	private long time;
	
	public String getContent() {
		return content;
	}

	public long getTime() {
		return time;
	}

	public Comment(String content, long time) {
		this.content = content;
		this.time = time;
	}

	@Override
	public int compareTo(Comment arg0) {
		return ((Long)time).compareTo(arg0.getTime());
	}
	
	
}
