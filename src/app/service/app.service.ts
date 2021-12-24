import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
    constructor(private http: HttpClient) {
    }
    addEmployee(request) {
        return this.http.put('/employee', request, { reportProgress: true, responseType: 'json' });
    }
    getEmployees() {
        return this.http.get('/employees', { reportProgress: true, responseType: 'json' });
    }
    deleteEmployees(request) {
        return this.http.post('/employees', request, { reportProgress: true, responseType: 'json' });
    }
    updateEmployee(id, request) {
        return this.http.post('/employee/' + id, request, { reportProgress: true, responseType: 'json' });
    }
    addReview(request) {
        return this.http.put('/review', request, { reportProgress: true, responseType: 'json' });
    }
    getReviews(eid) {
        return this.http.get('/reviews/' + eid, { reportProgress: true, responseType: 'json' });
    }
    closeReview(id) {
        return this.http.post('/closereview/' + id, { reportProgress: true, responseType: 'json' });
    }
    updateParticipants(id, request) {
        return this.http.post('/updateparticipants/' + id, request, { reportProgress: true, responseType: 'json' });
    }
    saveFeedback(request) {
        return this.http.put('/feedback', request, { reportProgress: true, responseType: 'json' });
    }
    getFeedbacks(rid) {
        return this.http.get('/feedback/' + rid, { reportProgress: true, responseType: 'json' });
    }
    getPendingReviews(id) {
        return this.http.get('/pendingreviews/' + id, { reportProgress: true, responseType: 'json' });
    }
}