import { Component, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent {

  isWorkExperienceOpen: boolean = false;
  isEducationOpen: boolean = false;
  isCertificationsOpen: boolean = false;
  isSkillsOpen: boolean = false;

  constructor(private readonly titleService: Title, private readonly renderer: Renderer2) {
    this.titleService.setTitle('Resume | JunhKi');
  }

  downloadResume() {
    this.downloadFile('assets/pdf/resume.pdf', 'resume.pdf');
  }

  downloadCertificate() {
    this.downloadFile('assets/pdf/goethe-zertifikat-b1.pdf', 'goethe-zertifikat-b1.pdf');
  }

  private downloadFile(srcFilePath: string, targetFileName: string) {
    const link = this.renderer.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', srcFilePath);
    link.setAttribute('download', targetFileName);
    link.click();
    link.remove();
  }
}
