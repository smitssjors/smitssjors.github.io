# Posts

---

{% for post in site.posts %}

## [{{ post.title }}]({{ post.url }})

{{ post.excerpt | strip_html }} [Read more →]({{ post.url }})

{% endfor %}
