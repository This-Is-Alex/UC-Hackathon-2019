package me.alex.hackathon.pages;

public abstract class Page {
	
	public abstract String getURL();
	public abstract String generateResponse(String body);
}
