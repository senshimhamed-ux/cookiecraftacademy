[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Website-2ea44f?style=for-the-badge)](https://cookiecraftacademy.cookiecraftacademy.workers.dev/)
# Cookie Craft Academy — Edge Gateway Infrastructure

A high-performance edge gateway and request orchestration infrastructure built by me for Cookie Craft Academy. Provides global low-latency routing, intelligent request handling, and origin protection.

## Architecture

```
┌─────────────────┐
│   Client        │
│   Requests      │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Cloudflare Edge Network            │
│  (Global PoPs - Low Latency)        │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Cloudflare Worker Reverse-Proxy    │
│  • Request Orchestration            │
│  • Header Management                │
│  • Origin Shielding                 │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Origin Server                      │
│  (Cookie Craft Academy Backend)     │
└─────────────────────────────────────┘
```

## Key Features

### 🌍 Global Low-Latency Routing
- Cloudflare's edge network serves requests from 300+ data centers worldwide
- Automatic geographic routing for optimal response times
- No single point of failure with distributed edge workers

### 🔀 Intelligent Request Orchestration
- Transparent reverse-proxy forwarding to origin servers
- Smart header manipulation (Host rewriting, Referer management)
- Request/response transformation pipeline
- Configurable upstream target via environment variables

### 🛡️ Origin Shielding & Protection
- Shields your origin server from direct client exposure
- Abstracts internal infrastructure details
- Prevents encoding-related issues with `Accept-Encoding` header stripping
- Follows redirects automatically for seamless user experience

### ⚙️ Easy Configuration
- Environment-based upstream URL management
- Production and staging environment support
- Zero-downtime configuration updates

## Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Runtime** | Cloudflare Workers | Serverless edge computing |
| **Infrastructure** | Cloudflare Edge Network | Global request routing |
| **CLI/Deployment** | Wrangler | Worker development & deployment |
| **Configuration** | wrangler.toml | Project & environment config |

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Cloudflare account with Workers enabled
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed

### Installation

```bash
# Clone the repository
git clone https://github.com/senshimhamed-ux/cookiecraftacademy.git
cd cookiecraftacademy

# Install dependencies
npm install
```

### Configuration

Edit `wrangler.toml` to set your upstream origin:

```toml
[env.production]
vars = { UPSTREAM_URL = "https://your-origin-server.com" }
```

Or set via environment variable:
```bash
export UPSTREAM_URL="https://your-origin-server.com"
```

## Deployment

### Deploy to Cloudflare Workers

```bash
# Publish to production
wrangler publish --env production

# Or deploy to a staging environment
wrangler publish --env staging
```

### Local Development

Test locally before deployment:

```bash
# Start local development server
wrangler dev

# Test with curl
curl http://localhost:8787/
```

### Monitoring

After deployment, monitor your Worker:

```bash
# View recent logs
wrangler tail

# Check deployment status
wrangler deployments list
```

## How It Works

1. **Client Request** → Cloudflare Edge
2. **Worker Processing** →
   - Parse incoming request URL and headers
   - Construct target URL using configured upstream server
   - Rewrite request headers for proper routing
   - Forward request to origin server
3. **Response Handling** →
   - Stream response back to client
   - Follow redirects as needed
   - Maintain connection integrity

## API Reference

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `UPSTREAM_URL` | `https://excellent-gourmet-cookie-craft.base44.app` | Target origin server URL |

### Request Flow

```javascript
fetch(targetUrl, {
  method: request.method,        // Preserve HTTP method
  headers: headers,              // Modified headers
  body: request.body,            // Pass-through body
  redirect: "follow"             // Handle redirects
})
```

## Performance Optimization

- **Cache Headers**: Configure origin to send proper cache headers
- **Compression**: Enable Cloudflare compression for text assets
- **HTTP/3**: Leverages Cloudflare's HTTP/3 support automatically
- **Tiered Caching**: Origin Shield option available for high-traffic scenarios

## Troubleshooting

### Worker Timeout
```bash
# Increase timeout in wrangler.toml
[limits]
cpu_ms = 50000
```

### Origin Connection Issues
- Verify `UPSTREAM_URL` is accessible
- Check origin server firewall allows Cloudflare IPs
- Review Worker logs: `wrangler tail`

### Header-Related Problems
- Inspect headers with: `curl -i https://your-worker-url`
- Adjust header manipulation in `src/index.js` as needed

## Security Considerations

- ✅ Origin server remains hidden behind edge gateway
- ✅ All traffic benefits from Cloudflare DDoS protection
- ✅ SSL/TLS termination at edge
- ✅ Request validation and filtering available via Wrangler middleware

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/commands/)
- [Reverse Proxy Examples](https://developers.cloudflare.com/workers/examples/reverse-proxy/)

## License

MIT

---

**Built for Cookie Craft Academy** — Delivering delicious learning experiences at the edge.
