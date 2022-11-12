import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "../model/employee.model";
import { Feedback } from "../model/feedback.model";
import { Review } from "../model/review.model";
import { Sprint } from "../model/sprint.model";
import { Story } from "../model/story.model";
import { openWeatherAPIKey } from '../../environments/secret';

@Injectable()
export class AppService {
    constructor(private http: HttpClient) {
    }
    getEmployees() {
        return this.http.get('/api/employee', { reportProgress: true, responseType: 'json' });
    }
    getEmployee(id: string) {
        return this.http.get('/api/employee/' + id, { reportProgress: true, responseType: 'json' });
    }
    addEmployee(employee: Employee) {
        return this.http.put('/api/employee', employee, { reportProgress: true, responseType: 'json' });
    }
    deleteEmployees(employees: Employee[]) {
        return this.http.post('/api/employee/delete', employees, { reportProgress: true, responseType: 'json' });
    }

    getReviews(employeeId: string) {
        return this.http.get('/api/review/' + employeeId, { reportProgress: true, responseType: 'json' });
    }
    addReview(review: Review) {
        return this.http.put('/api/review/' + review.targetId, review, { reportProgress: true, responseType: 'json' });
    }
    closeReview(review: Review) {
        return this.http.patch('/api/review/' + review.rid, { reportProgress: true, responseType: 'json' });
    }
    getFeedbacks(rid: string) {
        return this.http.get('/api/feedback/' + rid, { reportProgress: true, responseType: 'json' });
    }
    addFeedback(feedback: Feedback) {
        return this.http.put('/api/feedback', feedback);
    }
    addStory(story: Story) {
        return this.http.put('/api/story', story, { reportProgress: true, responseType: 'json' });
    }
    getStories(params: any) {
        return this.http.get('/api/story', { params: params, reportProgress: true, responseType: 'json' });
    }
    getStoriesByEmployee() {
        return this.http.post('/api/story/getUserStory', { reportProgress: true, responseType: 'json' });
    }
    updateStory(params: any) {
        return this.http.patch('/api/story', params, { reportProgress: true, responseType: 'json' });
    }

    addSprint(sprint: Sprint) {
        return this.http.put('/api/sprint', sprint, { reportProgress: true, responseType: 'json' });
    }
    getSprints() {
        return this.http.get('/api/sprint', { reportProgress: true, responseType: 'json' });
    }

    getProject() {
        return this.http.get('/api/project', { reportProgress: true, responseType: 'json' });
    }
    getAssignedReviews() {
        return this.http.post('/api/review/getAssignedReviews', { reportProgres: true, responseType: 'json' });
    }
    getMyInfo() {
        return this.http.post('/api/employee/myInfo', { reportProgress: true, responseType: 'json' });
    }
    getPosition(): Promise<any> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resp => {
                resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
            },
                err => {
                    reject(err);
                });
        });

    }
    getWeather(lat: string, lon: string) {
        const params = {
            lat,
            lon,
            units: 'imperial',
            appid: openWeatherAPIKey.key
        };
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        return this.http.get(url, { params: params, reportProgress: true, responseType: 'json' });
    }
}