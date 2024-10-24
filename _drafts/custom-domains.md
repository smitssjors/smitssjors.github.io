Let's assume you have a website builder and you are serving a user's site via
`user1.yoursite.com`. Now the goal is to allow your users to use their own
domain such that, for example, `user1.com` leads to `user1.yoursite.com`.

## DNS records

If your user wants to add a subdomain (e.g., `www.user1.com`), you simply
instruct them to add a `CNAME` record pointing `www.user1.com` to
`user1.yoursite.com` to their DNS configuration. However, for root domains
(i.e., `user1.com`) you will need to make sure that they add the correct record
type depending on their DNS provider. This will usually be something like
`ANAME`, `ALIAS`, or just `CNAME`.

If you have a stable IP address, you can also let the user add an `A` record.

## TLS certificates

You might ask yourself if this was enough and the short answer is no. If you are
serving your site over HTTPS (as you should), your end users will receive a TLS
error. This is because your TLS certificate is only for `*.yoursite.com` but the
request origin is `user1.com`. Thus, it is your responsibility now to fetch a
new TLS certificate for your users domain. This is the reason why you need to
fill in the domain you plan to use for services like GitHub Pages.

This can be an issue for a number of reasons. First of all, this might not be
possible. If you are useing a hosting platform like Vercel which manages TLS for
you, chances are you cannot add any new certificates/domains. Second, if you are
useing a proxy/CDN like Cloudflare which terminates TLS then this will mean you
either have to stop using it or use one of their services for this if they have
one (like [Cloudflare for SaaS](https://www.cloudflare.com/saas)).

Obtaining and renewing these certificates seems like a difficult job, lucily for
us there is an easy way of doing it.

## Caddy On-Demand TLS

[Caddy](https://caddyserver.com) is a powerful, production-ready, open-source
web server with automatic HTTPS written in Go. One of its killer feature is
being able to dynamically provision certificates. This means that on a request,
Caddy will automatically try to get a certificate for the host. However,
allowing this for any request can be dangerous. Therefore it is important to
have Caddy ask your application whether it should try to get a certificate for a
certain domain.

Let's see how this might work. First we will need an application.

```javascript
Deno.serve((req) => return new Response("Hello"))
```

```javascript
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_layouts/**/*.liquid",
    "./_posts/**/*.{html,md}",
    "./*.{html,md}",
  ],
  safelist: [{ pattern: /hljs.+/ }, "highlight"],
  theme: {
    extend: {
      fontFamily: {
        "sans": ['"InterVariable"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
```

{% highlight javascript %}
Deno.serve((req) => return new Response("Hello"))
{% endhighlight %}
