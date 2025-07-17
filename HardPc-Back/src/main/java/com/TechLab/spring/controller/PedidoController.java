package com.TechLab.spring.controller;

import com.TechLab.spring.model.Pedido;
import com.TechLab.spring.service.PedidoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedido")
public class PedidoController {

    private final PedidoService service;

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    @PostMapping("/")
    public Pedido crearPedido(@RequestBody Pedido pedido) {
        return service.crearPedido(pedido);
    }

    @GetMapping("/list")
    public List<Pedido> listarPedidos() {
        return service.listarPedidos();
    }

    @GetMapping("/{id}")
    public Pedido buscarPorId(@PathVariable Long id) {
        return service.buscarPedido(id);
    }
}