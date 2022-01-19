import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Movie } from './models/movies';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  listMovies: Movie[] = [];
  datosMovie: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.datosMovie = this.fb.group({
      titulo: ['', Validators.required],
      year: ['', Validators.required],
      genre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  
  registrarMovie(): void{
    const movie: Movie ={
      title: this.datosMovie.value.titulo,
      year: this.datosMovie.value.year,
      genre: this.datosMovie.value.genre
    };
    
    if (movie.title.trim() == "" || movie.genre.trim() == ""){
      this.toastr.error('No se permiten espacios en blancos', 'Error!');
    }else{
      this.listMovies.push(movie);
      this.toastr.success('La movie ' + movie.title + ' fue registrada con exito!', 'Movie Registrada!');
      this.datosMovie.reset();
    }   
  }

  eliminarMovie(indice: number): void{
    this.listMovies.splice(indice,1);
    this.toastr.info('La movie fue eliminada' , 'Movie Eliminada!');
  }
}
