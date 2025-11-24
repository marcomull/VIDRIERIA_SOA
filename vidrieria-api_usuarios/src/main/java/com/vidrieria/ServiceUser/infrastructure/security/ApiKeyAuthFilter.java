package com.vidrieria.ServiceUser.infrastructure.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class ApiKeyAuthFilter extends OncePerRequestFilter {

    @Value("${internal.api.key}")
    private String expectedApiKey;

    private static final String API_KEY_HEADER = "X-API-Key";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // 1. Solo aplicar este filtro a las rutas internas
        if (!request.getRequestURI().startsWith("/usuarios/internal/")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. Obtener la API Key del header
        String apiKey = request.getHeader(API_KEY_HEADER);

        // 3. Validar la Key
        if (apiKey != null && apiKey.equals(expectedApiKey)) {
            // 4. Autenticar la solicitud (dándole el rol de ADMIN)
            // Le damos el rol que el endpoint espera ("ROLE_ADMIN")
            var authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"));
            var authentication = new UsernamePasswordAuthenticationToken("internal-service", null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            filterChain.doFilter(request, response);
        } else {
            // 5. Rechazar si la key es inválida o no existe
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("API Key invalida o no proporcionada");
        }
    }
}