import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Article } from '../interfaces/article.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principalpage',
  templateUrl: './principalpage.component.html',
  styleUrls: ['./principalpage.component.css'],
})
export class PrincipalpageComponent implements OnInit {
  public noticias: Article[] = [];
  public noticiasFiltradas: Article[] = [];
  public noticiasMostradas: Article[] = [];
  public isLoading: boolean = false;
  public noMatches: boolean = false;
  public pageSize: number = 6;
  public currentPage: number = 1;
  public totalPages: number = 1;

  constructor(private readonly service: ServicesService) {}

  ngOnInit(): void {
    this.getNoticias();
  }

  getNoticias(): void {
    this.isLoading = true;
    this.service.getArticles().subscribe({
      next: (articles: any) => {
        this.noticias = articles.results;
        this.noticiasFiltradas = [...this.noticias];
        this.updateNoticiasMostradas();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener los artículos:', error);
        this.isLoading = false;
      }
    });
  }

  updateNoticiasMostradas(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.noticiasMostradas = this.noticiasFiltradas.slice(startIndex, startIndex + this.pageSize);
    this.totalPages = Math.ceil(this.noticiasFiltradas.length / this.pageSize);
  }

  recibirNoticiasFiltradas(event: Article[]): void {
    this.noticiasFiltradas = event;
    this.noMatches = event.length === 0;
    this.currentPage = 1;
    this.updateNoticiasMostradas();
  }

  cambiarPagina(page: number): void {
    this.currentPage = page;
    this.updateNoticiasMostradas();
  }

  agregarAFavoritos(noticia: any): void {
    this.service.addFavorite(noticia).subscribe(resp => {
      Swal.fire({
        title: '¡Éxito!',
        text: 'Agregado a favoritos correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    });
  }
}
