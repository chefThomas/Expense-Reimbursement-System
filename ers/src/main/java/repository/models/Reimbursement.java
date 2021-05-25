package repository.models;

public class Reimbursement {
    private int id;
    private double amount;
    private String dateSubmitted;
    private String dateResolved;
    private String description;
    private String receipt;
    private int authorId;
    private int statusId;
    private String status;
    private int typeId;
    private String type;
    private int resolverId;
    private String resolverFirstName;
    private String resolverLastName;
    private String authorFirstName;
    private String authorLastName;

    public Reimbursement(int id) {
        this.id = id;
    }

    public Reimbursement(double amount, String descr) {
        this.amount = amount;
        this.description = descr;
    }

    public Reimbursement(double amount, String desc, int authorId, int typeId) {
        this.amount = amount;
        this.description = desc;
        this.authorId = authorId;
        this.typeId = typeId;
    }

    public Reimbursement(int id, double amount, String dateSubmitted, String description, int authorId, int statusId,
            int typeId) {
        this.id = id;
        this.amount = amount;
        this.dateSubmitted = dateSubmitted;
        this.description = description;
        this.authorId = authorId;
        this.statusId = statusId;
        this.typeId = typeId;
    }

    public Reimbursement(int id, double amount, String dateSubmitted, String dateResolved, String description,
            String receipt, int authorId, int resolverId, int statusId, int typeId) {
        this.id = id;
        this.amount = amount;
        this.dateSubmitted = dateSubmitted;
        this.dateResolved = dateResolved;
        this.description = description;
        this.receipt = receipt;
        this.authorId = authorId;
        this.resolverId = resolverId;
        this.statusId = statusId;
        this.typeId = typeId;
    }

    public Reimbursement(int id, double amount, String dateSubmitted, String dateResolved, String description,
            String receipt, int authorId, int resolverId, int statusId, int typeId, String type, String status,
            String resolverFirstName, String resolverLastName, String authorFirstName, String authorLastName) {
        this.id = id;
        this.amount = amount;
        this.dateSubmitted = dateSubmitted;
        this.dateResolved = dateResolved;
        this.description = description;
        this.receipt = receipt;
        this.authorId = authorId;
        this.resolverId = resolverId;
        this.statusId = statusId;
        this.typeId = typeId;
        this.type = type;
        this.status = status;
        this.resolverFirstName = resolverFirstName;
        this.resolverLastName = resolverLastName;
        this.authorFirstName = authorFirstName;
        this.authorLastName = authorLastName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getResolverFirstName() {
        return resolverFirstName;
    }

    public void setResolverFirstName(String resolverFirstName) {
        this.resolverFirstName = resolverFirstName;
    }

    public String getResolverLastName() {
        return resolverLastName;
    }

    public void setResolverLastName(String resolverLastName) {
        this.resolverLastName = resolverLastName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDateSubmitted() {
        return dateSubmitted;
    }

    public void setDateSubmitted(String dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
    }

    public String getDateResolved() {
        return dateResolved;
    }

    public void setDateResolved(String dateResolved) {
        this.dateResolved = dateResolved;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getReceipt() {
        return receipt;
    }

    public void setReceipt(String receipt) {
        this.receipt = receipt;
    }

    public int getAuthorId() {
        return authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    public int getResolverId() {
        return resolverId;
    }

    public void setResolverId(int resolverId) {
        this.resolverId = resolverId;
    }

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    public int getReimbursementTypeId() {
        return typeId;
    }

    public void setReimbursementTypeId(int typeId) {
        this.typeId = typeId;
    }

}
