package com.ladder.perfumism.article.domain;

import com.ladder.perfumism.global.domain.BaseEntity;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;
import org.yaml.snakeyaml.util.EnumUtils;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class Article extends BaseEntity {

    @Id @GeneratedValue
    @Column(name = "article_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "subject", nullable = false)
    private ArticleSubject subject;

    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    protected Article(){

    }

    @Builder
    private Article(ArticleSubject subject, String title, String content){
        this.subject = subject;
        this.title = title;
        this.content = content;
    }

    public void changeSubject(ArticleSubject subject){
        if(!Objects.isNull(subject)){
            this.subject = subject;
        }
    }

    public void changeTitle(String title){
        if (!Objects.isNull(title)){
            this.title = title;
        }
    }

    public  void changeContent(String content){
        if (!Objects.isNull(content)){
            this.content = content;
        }
    }
}