package com.TechLab.spring.service;

import com.TechLab.spring.model.Pedido;
import com.TechLab.spring.repository.PedidoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService implements IPedidoService {

    private final PedidoRepository repo;

    public PedidoService(PedidoRepository repo) {
        this.repo = repo;
    }

    @Override
    public Pedido crearPedido(Pedido pedido) {
        pedido.setEstado("EN_PROCESO");
        return repo.save(pedido);
    }

    @Override
    public List<Pedido> listarPedidos() {
        return repo.findAll();
    }

    @Override
    public Pedido buscarPedido(Long id) {
        return repo.findById(id).orElse(null);
    }
}