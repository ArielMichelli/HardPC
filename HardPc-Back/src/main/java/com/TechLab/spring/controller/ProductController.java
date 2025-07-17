package com.TechLab.spring.controller;
import com.TechLab.spring.model.Producto;
import com.TechLab.spring.service.ProductoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/productos")
public class ProductController {

    private  ProductoService productoService;

    public ProductController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping("/list")
    public List<Producto> listarProductos() {
        return productoService.listarProductos();
    }

    @PostMapping("/")
    public String crearProducto(@RequestBody Producto producto){
        return productoService.crearProducto(producto);
    }

    @PostMapping("/batch")
    public List<Producto> crearProductos(@RequestBody List<Producto> productos ) {
        return productoService.crearProductos(productos);
    }

    @GetMapping("/find/{id}")
    public Producto buscarProductos(@PathVariable Long id) {
        return productoService.buscarPorId(id);
    }

    @PutMapping("/edit/{id}")
    public String editarProducto(@PathVariable Long id, @RequestBody Producto producto) {
        return productoService.editarProducto(id, producto);
    }

    @DeleteMapping("/delete/{id}")
    public String eliminarProducto(@PathVariable Long id) {
        return productoService.eliminarProducto(id);
    }

}
