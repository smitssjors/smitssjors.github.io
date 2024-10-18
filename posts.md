# Posts

{% for post in site.posts %}
### {{ post.title }}
{{ post.excerpt }} [Read more]({{ post.url }})
{% endfor %}
