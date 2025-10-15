package com.vs.crm.controller;

import com.vs.crm.model.Document;
import com.vs.crm.repo.DocumentRepository;
import com.vs.crm.service.S3StorageService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Map;

@RestController
@RequestMapping("/api/docs")
public class DocumentController {
    private final DocumentRepository docs;
    private final S3StorageService s3;

    public DocumentController(DocumentRepository docs, S3StorageService s3) {
        this.docs = docs; this.s3 = s3;
    }

    public record CreateUploadUrl(Long ownerUserId, @NotBlank String filename, String contentType, Long sizeBytes) {}

    @PostMapping("/upload-url")
    public ResponseEntity<?> createUpload(@RequestBody CreateUploadUrl req){
        String key = "user-"+req.ownerUserId()+"/"+System.currentTimeMillis()+"-"+req.filename();
        String url = s3.presignUpload(key, req.contentType()==null?"application/octet-stream":req.contentType(), req.sizeBytes()==null?0:req.sizeBytes(), Duration.ofMinutes(10));
        Document d = new Document();
        d.setOwnerUserId(req.ownerUserId());
        d.setFilename(req.filename());
        d.setContentType(req.contentType());
        d.setSizeBytes(req.sizeBytes());
        d.setS3Key(key);
        docs.save(d);
        return ResponseEntity.ok(Map.of("uploadUrl", url, "key", key, "documentId", d.getId()));
    }

    public record DownloadUrl(String key) {}

    @PostMapping("/download-url")
    public ResponseEntity<?> download(@RequestBody DownloadUrl req){
        String url = s3.presignDownload(req.key(), Duration.ofMinutes(10));
        return ResponseEntity.ok(Map.of("downloadUrl", url));
    }
}
