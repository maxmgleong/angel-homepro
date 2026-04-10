export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const path = url.pathname

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    try {
      // Properties API
      if (path === '/api/properties' && request.method === 'GET') {
        const result = await env.DB.prepare('SELECT * FROM properties').first()
        const data = result ? JSON.parse(result.data) : null
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      if (path === '/api/properties' && request.method === 'POST') {
        const body = await request.json()
        const data = JSON.stringify(body.properties)
        // Check if exists
        const existing = await env.DB.prepare('SELECT * FROM properties').first()
        if (existing) {
          await env.DB.prepare('UPDATE properties SET data = ?, updated_at = ?').bind(data, new Date().toISOString()).run()
        } else {
          await env.DB.prepare('INSERT INTO properties (data, updated_at) VALUES (?, ?)').bind(data, new Date().toISOString()).run()
        }
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      // Tenants API
      if (path === '/api/tenants' && request.method === 'GET') {
        const result = await env.DB.prepare('SELECT * FROM tenants').first()
        const data = result ? JSON.parse(result.data) : []
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      if (path === '/api/tenants' && request.method === 'POST') {
        const body = await request.json()
        const data = JSON.stringify(body.tenants)
        const existing = await env.DB.prepare('SELECT * FROM tenants').first()
        if (existing) {
          await env.DB.prepare('UPDATE tenants SET data = ?, updated_at = ?').bind(data, new Date().toISOString()).run()
        } else {
          await env.DB.prepare('INSERT INTO tenants (data, updated_at) VALUES (?, ?)').bind(data, new Date().toISOString()).run()
        }
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      // Image upload to R2
      if (path === '/api/upload' && request.method === 'POST') {
        const formData = await request.formData()
        const file = formData.get('file')
        const folder = formData.get('folder') || 'misc'
        
        if (!file) {
          return new Response(JSON.stringify({ error: 'No file provided' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        const filename = `${folder}/${Date.now()}_${file.name}`
        await env.IMAGES.put(filename, file.stream(), {
          httpMetadata: { contentType: file.type }
        })

        const imageUrl = `${url.origin}/images/${filename}`
        return new Response(JSON.stringify({ url: imageUrl }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      // Serve uploaded images from R2
      if (path.startsWith('/images/')) {
        const filename = path.substring('/images/'.length)
        const object = await env.IMAGES.get(filename)
        if (!object) {
          return new Response('Not found', { status: 404 })
        }
        return new Response(object.body, {
          headers: {
            'Content-Type': object.httpMetadata.contentType || 'application/octet-stream',
            'Cache-Control': 'public, max-age=31536000',
          }
        })
      }

      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
  }
}
