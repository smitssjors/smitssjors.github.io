Let's say you have a website builder and you're hosting a user's site at
`user1.yoursite.com`. The goal is to allow users to use their own domain so
that, for example, `user1.com` points to `user1.yoursite.com`.

## DNS Records

If a user wants to set up a subdomain (like `www.user1.com`), you can simply
instruct them to add a `CNAME` record that points `www.user1.com` to
`user1.yoursite.com` in their DNS settings. However, for root domains (e.g.,
`user1.com`), the correct record type depends on their DNS provider. This could
be an `ANAME`, `ALIAS`, or even a `CNAME` record.

If you have a stable IP address, you can also guide the user to add an `A`
record.

## TLS Certificates

At this point, you might wonder if that’s all you need to do, but the short
answer is no. If your site is served over HTTPS (which it should be), users will
encounter a TLS error. This happens because your TLS certificate only covers
`*.yoursite.com`, but the request is coming from `user1.com`. You’ll need to
obtain a new TLS certificate for your user’s domain.

This can present some challenges. For instance, if you're using a hosting
platform like Vercel that manages TLS, you may not have the option to add
certificates for custom domains. Or, if you're using a proxy/CDN service like
Cloudflare that terminates TLS, you’ll need to either disable it or use one of
their services designed for this purpose (such as
[Cloudflare for SaaS](https://www.cloudflare.com/saas)).

While managing and renewing certificates might seem daunting, fortunately,
there’s an easier solution.

## Caddy On-Demand TLS

[Caddy](https://caddyserver.com) is an open-source web server built in Go, known
for its automatic HTTPS capabilities. One of its standout features is the
ability to dynamically issue certificates on demand. When a request comes in,
Caddy will automatically attempt to obtain a certificate for the requested
domain. However, since this can be risky, it's important to configure Caddy to
ask your application whether it should issue a certificate for a particular
domain.

Here’s an example Caddyfile configuration. The global `on_demand_tls.ask` option
ensures that Caddy makes a request to
`http://localhost:5555/check?domain=example.com` to validate the domain. The
`tls.on_demand` option enables On-Demand TLS for the specified site.

```caddyfile
{
    on_demand_tls {
        ask      http://localhost:5555/check
    }
}

https:// {
    tls {
        on_demand
    }
    reverse_proxy localhost:9000
}
```

For more details, check the Caddy documentation:

- [Automatic HTTPS - On-Demand TLS](https://caddyserver.com/docs/automatic-https#on-demand-tls)
- [Caddyfile Options - On-Demand TLS](https://caddyserver.com/docs/caddyfile/options#on-demand-tls)
- [Serving Many Domains with Caddy](https://caddy.community/t/serving-tens-of-thousands-of-domains-over-https-with-caddy/11179)
