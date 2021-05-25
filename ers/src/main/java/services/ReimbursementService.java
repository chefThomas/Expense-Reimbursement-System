package services;

import java.util.List;

import repository.daos.ReimbursementDao;
import repository.daos.ReimbursementDaoImpl;
import repository.models.Reimbursement;
import repository.models.User;

public class ReimbursementService {
    private static ReimbursementDao rDao = new ReimbursementDaoImpl();

    public Reimbursement approveReq(int reimbursementId, int managerId) {
        return rDao.approve(reimbursementId, managerId);
    }

    public Reimbursement denyReq(int reimbursementId, int managerId) {
        return rDao.deny(reimbursementId, managerId);
    }

    public List<Reimbursement> getAllReimbursements() {
        return rDao.getAll();
    }

    public List<Reimbursement> getReimbursementsByEmployee(User u) {
        return rDao.getAllByEmp(u);
    }

    public Reimbursement addReimbursement(Reimbursement re) {
        return rDao.add(re);
    }

}
