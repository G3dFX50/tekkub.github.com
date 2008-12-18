#! /c/ruby/bin/ruby

require 'net/http'
require 'rubygems'
require 'json'
require 'yaml'


data_hash = {}
data = Net::HTTP.get("github.com", "/api/v1/json/tekkub")
data = JSON.parse(data)["user"]["repositories"]
data.reject! {|r| r["description"].empty? || !(r["description"] =~ /\AWoW Addon - /)}
data.sort! {|a,b| a["name"] <=> b["name"]}
data.map! {|r| {"name" => r["name"], "description" => r["description"].gsub(/\AWoW Addon - /, ""), "pledgie" => r["pledgie"], "url" => r["url"]}}
puts YAML::dump({"addons" => data})
