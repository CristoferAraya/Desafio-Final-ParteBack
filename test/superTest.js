const request = require('supertest');
const server = require('../server');
const jwtToken =
 

describe('Operaciones sobre peluquerias', () => {
  describe('GET /peluquerias', () => {
    it('Obtiene un status code 200', async () => {
      const response = await request(server).get('/peluquerias').send();
      const status = response.statusCode;
      expect(status).toBe(200);
    });

    it('Tipo de dato recibido es un array', async () => {
      const { body } = await request(server).get('/peluquerias').send();
      const peluquerias = body;
      expect(peluquerias).toBeInstanceOf(Array);
    });

    it('Dato recibido tiene al menos un elemento', async () => {
      const { body } = await request(server).get('/peluquerias').send();
      const peluquerias = body;
      expect(peluquerias.length).toBeGreaterThan(0);
    });

    it('Obtiene un status code 200 al obtener las peluquerias de un usuario', async () => {
      const response = await request(server)
        .get(`/peluquerias`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send();
      const status = response.statusCode;
      expect(status).toBe(200);
    });
  });

  describe('GET /peluquerias/:peluqueriaId', () => {
    it('Obtiene un status code 200 al obtener una peluqueria por id', async () => {
      const peluqueriaId = 6;
      const response = await request(server)
        .get(`/peluquerias/${peluqueriaId}`)
        .send();
      const status = response.statusCode;
      expect(status).toBe(200);
    });

    it('Obtiene un status code 404 al obtener una peluqueria por id inexistente', async () => {
      const peluqueriaId = 1000;
      const response = await request(server)
        .get(`/peluquerias/${peluqueriaId}`)
        .send();
      const status = response.statusCode;
      expect(status).toBe(404);
    });
  });

  describe('POST /peluquerias', () => {
    it('Obtiene un status code 201 al crear una peluqueria', async () => {
      const peluqueria = {
        nombre: 'Peluqueria Canina de prueba',
        direccion: 'Calle de prueba',
        telefono: '123456789',
        email: 'pruebas@email.com',
      };
      const response = await request(server)
        .post(`/peluquerias`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(peluqueria);
      const status = response.statusCode;
      expect(status).toBe(201);
    });

    it('Obtiene un status code 400 al crear una peluqueria sin estar logueado', async () => {
      const peluqueria = {
        nombre: 'Peluqueria Canina de prueba',
        direccion: 'Calle de prueba',
        telefono: '123456789',
        email: 'pruebas@email.com',
      };
      const response = await request(server)
        .post(`/peluquerias`)
        .send(peluqueria);
      const status = response.statusCode;
      expect(status).toBe(401);
    });
  });

  describe('PUT /peluquerias/:peluqueriaId', () => {
    it('Obtiene un status code 200 al actualizar una peluqueria', async () => {
      const peluqueriaId = 6;
      const peluqueria = {
        nombre: 'Peluqueria Canina de prueba  se a actualizada',
        direccion: 'Calle de prueba actualizada',
        telefono: '123456789',
        email: 'pruebas@email.com',
        activa: false,
      };
      const response = await request(server)
        .put(`/peluquerias/${peluqueriaId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(peluqueria);
      const status = response.statusCode;
      expect(status).toBe(200);
    });

    it('Obtiene un status code 403 al actualizar una peluqueria que no pertenece al usuario o que no existe', async () => {
      const peluqueriaId = 1000;
      const peluqueria = {
        nombre: 'Peluqueria Canina de prueba se a actualizada',
        direccion: 'Calle de prueba actualizada',
        telefono: '123456789',
        email: 'pruebas@email.com',
        activa: true,
      };
      const response = await request(server)
        .put(`/peluquerias/${peluqueriaId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(peluqueria);
      const status = response.statusCode;
      expect(status).toBe(403);
    });
  });

  describe('DELETE /peluquerias/:peluqueriaId', () => {
    it('Obtiene un status code 200 al eliminar una peluqueria', async () => {
      const peluqueriaId = 11; 
      const response = await request(server)
        .delete(`/peluquerias/${peluqueriaId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send();
      const status = response.statusCode;
      expect(status).toBe(200);
    });

    it('Obtiene un status code 403 al eliminar una peluqueria que no pertenece al usuario o que no existe', async () => {
      const peluqueriaId = 1000;
      const response = await request(server)
        .delete(`/peluquerias/${peluqueriaId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send();
      const status = response.statusCode;
      expect(status).toBe(403);
    });
  });
});

describe('Operaciones sobre servicios', () => {
  describe('GET /peluqueria/:peluqueriaId/servicios', () => {
    it('Obtiene un status code 200 al obtener los servicios de una peluqueria', async () => {
      const peluqueriaId = 21;
      const response = await request(server)
        .get(`/peluqueria/${peluqueriaId}/servicios`)
        .send();
      const status = response.statusCode;
      expect(status).toBe(200);
    });

    it('Obtiene un status code 404 al obtener los servicios de una peluqueria inexistente', async () => {
      const peluqueriaId = 1000;
      const response = await request(server)
        .get(`/peluqueria/${peluqueriaId}/servicios`)
        .send();
      const status = response.statusCode;
      expect(status).toBe(404);
    });

    it('Tipo de dato recibido es un array', async () => {
      const peluqueriaId = 21;
      const { body } = await request(server)
        .get(`/peluqueria/${peluqueriaId}/servicios`)
        .send();
      const servicios = body;
      expect(servicios).toBeInstanceOf(Array);
    });
  });

  describe('POST /peluqueria/:peluqueriaId/servicios', () => {
    it('Obtiene un status code 201 al crear un servicio', async () => {
      const peluqueriaId = 11;
      const servicio = {
        nombre: 'Esto es un servicio de prueba',
        precio: 10,
        descripcion: 'Esta es una prueba',
      };
      const response = await request(server)
        .post(`/peluqueria/${peluqueriaId}/servicios`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(servicio);
      const status = response.statusCode;
      expect(status).toBe(201);
    });

    it('Obtiene un status code 400 al crear un servicio sin estar logueado', async () => {
      const peluqueriaId = 21;
      const servicio = {
        nombre: 'Esto es un servivio de prueba',
        precio: 10,
        descripcion: 'Esta es una  prueba',
      };
      const response = await request(server)
        .post(`/peluqueria/${peluqueriaId}/servicios`)
        .send(servicio);
      const status = response.statusCode;
      expect(status).toBe(401);
    });

    it('Obtiene un status code 403 al crear un servicio en una peluqueria que no pertenece al usuario', async () => {
      const peluqueriaId = 1000;
      const servicio = {
        nombre: 'Esto es un servicioo de prueba',
        precio: 10,
        descripcion: 'Esto es una prueba',
      };
      const response = await request(server)
        .post(`/peluqueria/${peluqueriaId}/servicios`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(servicio);
      const status = response.statusCode;
      expect(status).toBe(403);
    });

    it('Obtiene un status code 400 al crear un servicio con datos incorrectos', async () => {
      const peluqueriaId = 11;
      const servicio = {
        descripcion: 'Esto es una prueba',
      };
      const response = await request(server)
        .post(`/peluqueria/${peluqueriaId}/servicios`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(servicio);
      const status = response.statusCode;
      expect(status).toBe(400);
    });
  });

  describe('PUT /peluqueria/:peluqueriaId/servicios/:servicioId', () => {
    it('Obtiene un status code 200 al actualizar un servicio', async () => {
      const peluqueriaId = 21;
      const servicioId = 6;
      const servicio = {
        nombre: 'El servicop de prueba se a  actualizado',
        precio: 10,
        descripcion: 'Esto es una prueba',
      };
      const response = await request(server)
        .put(`/peluqueria/${peluqueriaId}/servicios/${servicioId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(servicio);
      const status = response.statusCode;
      expect(status).toBe(200);
    });

    it('Obtiene un status code 403 al actualizar un servicio que no pertenece al usuario o que no existe', async () => {
      const peluqueriaId = 4000;
      const servicioId = 4000;
      const servicio = {
        nombre: 'El servicio de prueba se a actualizasdo',
        precio: 10,
        descripcion: 'Esto es una prueba',
      };
      const response = await request(server)
        .put(`/peluqueria/${peluqueriaId}/servicios/${servicioId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(servicio);
      const status = response.statusCode;
      expect(status).toBe(403);
    });
  });

  describe('DELETE /peluqueria/:peluqueriaId/servicios/:servicioId', () => {
    it('Obtiene un status code 200 al eliminar un servicio', async () => {
      const peluqueriaId = 11;
      const servicioId = 10; 
      const response = await request(server)
        .delete(`/peluqueria/${peluqueriaId}/servicios/${servicioId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send();
      const status = response.statusCode;
      expect(status).toBe(200);
    });

    it('Obtiene un status code 403 al eliminar un servicio que no pertenece al usuario o que no existe', async () => {
      const peluqueriaId = 4000;
      const servicioId = 4000;
      const response = await request(server)
        .delete(`/peluqueria/${peluqueriaId}/servicios/${servicioId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send();
      const status = response.statusCode;
      expect(status).toBe(403);
    });
  });
});