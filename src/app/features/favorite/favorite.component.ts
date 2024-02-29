import {Component, OnInit} from '@angular/core';
import {Article} from "../interfaces/article.interfaces";
import {ServicesService} from "../services/services.service";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit{

  public favoritos: Article[] = [];
  public favoritosFiltrados: Article[] = [];
  public favoritosMostradas: Article[] = [];
  public isLoading: boolean = false;
  public noMatches: boolean = false;
  public pageSize: number = 6;
  public currentPage: number = 1;
  public totalPages: number = 1;

  constructor(private readonly service: ServicesService) {}

  ngOnInit(): void {
    this.getFavoritos();
  }

  getFavoritos(): void {
    this.isLoading = true;
    this.service.getAllFavorites().subscribe({
      next: (articles: any) => {
        this.favoritos = Array.isArray(articles) ? articles : [];
        this.favoritosFiltrados = [...this.favoritos];
        this.updateFavoritosMostradas();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener los favoritos:', error);
        this.favoritos = [];
        this.isLoading = false;
      }
    });
  }

  updateFavoritosMostradas(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.favoritosMostradas = this.favoritosFiltrados.slice(startIndex, startIndex + this.pageSize);
    this.totalPages = Math.ceil(this.favoritosFiltrados.length / this.pageSize);
  }

  recibirFavoritosFiltrados(event: Article[]): void {
    this.favoritosFiltrados = event;
    this.noMatches = event.length === 0;
    this.currentPage = 1;
    this.updateFavoritosMostradas();
  }

  cambiarPagina(page: number): void {
    this.currentPage = page;
    this.updateFavoritosMostradas();
  }
}
