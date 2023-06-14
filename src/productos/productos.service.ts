import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto) private productRepository: Repository<Producto>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const producto: DeepPartial<Producto> = {
      ...createProductoDto,
    };
    return this.productRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Producto> {
    return this.productRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.productRepository.findOne({ where: { id } });
    if (!producto) {
      throw new Error(`Producto with ID ${id} not found`);
    }

    const updatedProducto = Object.assign(producto, updateProductoDto);
    return this.productRepository.save(updatedProducto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.productRepository.findOne({ where: { id } });
    if (!producto) {
      throw new Error(`Producto with ID ${id} not found`);
    }

    await this.productRepository.remove(producto);
  }
}
