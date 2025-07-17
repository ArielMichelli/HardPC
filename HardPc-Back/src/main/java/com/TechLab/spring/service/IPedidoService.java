package com.TechLab.spring.service;

import com.TechLab.spring.model.Pedido;
import java.util.List;

public interface IPedidoService {
    Pedido crearPedido(Pedido pedido);
    List<Pedido> listarPedidos();
    Pedido buscarPedido(Long id);
}