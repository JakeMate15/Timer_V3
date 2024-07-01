package com.apiTimer.servicios;

import com.apiTimer.entidades.Usuario;
import com.apiTimer.repositorios.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> findAll() {
        List<Usuario> usuarios = new ArrayList<>();
        usuarioRepository.findAll().forEach(usuarios::add);
        return usuarios;
    }

    public Usuario findById(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.orElse(null);
    }

    public Usuario findByUsuario(String usuario) {
        return usuarioRepository.findByUsuario(usuario);
    }

    public Usuario save(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void deleteById(Long id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario addFriend(Long userId, Long friendId) {
        Usuario usuario = findById(userId);
        Usuario amigo = findById(friendId);
        if (usuario != null && amigo != null) {
            usuario.getAmigos().add(amigo);
            usuarioRepository.save(amigo);
            return usuarioRepository.save(usuario);
        }
        return null;
    }

    public Usuario removeFriend(Long userId, Long friendId) {
        Usuario usuario = findById(userId);
        Usuario amigo = findById(friendId);
        if (usuario != null && amigo != null) {
            usuario.getAmigos().remove(amigo);
            usuarioRepository.save(amigo);
            return usuarioRepository.save(usuario);
        }
        return null;
    }

    public List<Usuario> obtenerAmigos(Long userId) {
        Usuario usuario = findById(userId);
        return new ArrayList<>(usuario.getAmigos());
    }
}
