package com.TechLab.spring.service;
import com.TechLab.spring.model.Producto;
import java.util.List;

public interface IProductoService {
    String crearProducto(Producto producto);
    List<Producto> listarProductos();
    Producto buscarPorId(Long id);
    String editarProducto(Long id, Producto producto);
    String eliminarProducto(Long id);
}